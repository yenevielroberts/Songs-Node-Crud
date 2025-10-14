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


//Le digo que tengo diferentes endpoints
app.use('/movies', moviesRoutes);
app.use('/songs', songsRoutes);

//Endpoints

app.get('/', (req, res) => {
    const {user}=res.session
    res.render("loginForm")
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
