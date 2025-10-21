import bcrypt from 'bcryptjs';
import DBLocal from 'db-local';
import crypto from 'node:crypto';
import { SALT_ROUNDS } from './config.js';
const { Schema } = new DBLocal({ path: './db' })//Creació de la base de dades

//Creem un esquema per les dades amb els camps especificats
const User = Schema('User', {//Es com definir una taula
    _id: { type: String, required: true },//el camp id serà de tipus string i serà obligatori
    username: { type: String, required: true },
    password: { type: String, required: true }
})

//Exportem en una classe per crear usuaris i fer login
export class UserRepository {

    static async create({ username, password }) {
        //1. Validació opcional usar zod(biblioteca de valaidacions)

        Validation.username(username)
        Validation.password(password)

        //2. Asegurarse que el username no existeix
        const user = await User.findOne({ username })

        if (user) throw new Error('username already exists')

        //3. Creem un id com si fos base de dades normal
        //Millor que el generi la base de dades
        const id = crypto.randomUUID()

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        //4. Creem l'usuari

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()

        const publicUser={
            _id:id,
            username:username
        }
        return publicUser
    }

    static async login({ username, password }) {
        Validation.username(username)
        Validation.password(password)
        //2. Asegurarse que el username existe
        const user = User.findOne({ username })//Miro so existe el usuario
        // Si no existe error
        if (!user) throw new Error('username does not exist')
        //no lo desencripta para compararlo    
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) throw new Error('password is invalid')
        //Per no enviar el password copiem tot el contingut menys el password
        const { password: _, ...publicUser } = user
        return publicUser
    }
}

class Validation {
    //static->No nessecito fer un objecte de la classe per cridar un mètode de la classe
    static username(username) {
        if (typeof username != 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('Username superior a 3 caracteres');

    }
    static password(password) {
        if (typeof password != 'string') throw new Error('sdfjkl must be a string');
        if (password.length < 6) throw new Error('password superior a 5 caracteres');

    }
}