import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import methodOverride from 'method-override';//simula peticiones PUT y DELETE en los formularios HTML
import songsRoutes from './routes/songs.js';
import moviesRoutes from './routes/movies.js'

const app = express();
//Declaro lo que usaré
app.use(express.json());//Se puede utilizar este en vez de bodyparse()
app.use(express.static("public"))//le digo como tiene que tratar los archivos dentro de esa carpeta
app.set('view engine', 'ejs')//Quiere decir que quiero usar este motor
app.set('views', './views')//Le digo donde estarán las vistas
app.use(cookieParser())
app.use(methodOverride('_method'));


app.set('view engine', 'ejs'); // Motor de plantilles
app.set('views', './views'); // Ubicació de les plantilles


//inicio middleware
app.use((req,res,next)=>{//interseta todas las peticiones 
    const token =req.cookies.access_token//Obtengo el token guardado en la cookie
    req.session={user: null}//Creo una session. Un objecto con el campo user
    try{
        const data=jwt.verify(token,SECRET_JWT_KEY)//Verifico el token
        req.session.user=data
    }catch(error){
        req.session.user=null
    }
    next() //Pasa al siguiente endpoint
})

//Le digo que tengo diferentes endpoints
app.use('/movies', moviesRoutes);
app.use('/songs', songsRoutes);


//Endpoints

app.get('/', (req, res) => {
    const {user}=req.session//Obtengo la info del usuario
    res.render("loginForm", user)
})

app.post('/login', async(req, res)=>{

    try{

        const {username, password}=req.body
        const user=await UserRepository.login({username, password})

        //Genero el token
        const token=jwt.sign(
            {id: user._id, username:user.username},
            SECRET_JWT_KEY,
            {expiresIn:'1h'}
        )
        //Creo una cookie en la respuesta HTTP. Primer argumento nombre de la cookie,segundor argumento el valor que se guardara y último opciones de seguridad y duración
        .cookie('access_token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            sameSite:'strict',
            maxAge:1000*60*60
        })
        .send({user, token})
    }catch(error){
        res.status(401).send(error.message)
    }
})

app.post ('/signup',async (req, res)=>{
    console.log("cuerpo",req.body)

    const {username, password}=req.body//Obtengo los valores del body enviado en el json
    try{
        const id= await UserRepository.create({username, password});
        res.send({id})
    }catch(error){
        res.status(400).send(error.message)
    }
    
})


app.post('/login', async(req,res)=> {

    const{username, password}=req.body
    
})

app.get('/protected', (req,res)=>{
    res.render('protected')
})




//Funció per escoltar
app.listen(PORT, () => {
    console.log(`Server listing on http://localhost:${PORT}`);
});
