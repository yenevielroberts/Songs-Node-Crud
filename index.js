import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { UserRepository } from './user_respository.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import methodOverride from 'method-override';//simula peticiones PUT y DELETE en los formularios HTML
import songsRoutes from './routes/songsRoutes.js';
import moviesRoutes from './routes/moviesRoutes.js';

const app = express();
//Declaro lo que usaré
app.use(express.json());//Se puede utilizar este en vez de bodyparse()
app.use(express.static("public"))//le digo como tiene que tratar los archivos dentro de esa carpeta
app.set('view engine', 'ejs')//Quiere decir que quiero usar este motor
app.set('views', './views')//Le digo donde estarán las vistas
app.use(cookieParser())
app.use(methodOverride('_method'));


app.set('view engine', 'ejs'); // Motor de plantilles
app.set('views', './views'); // Ubicación de las plantillas


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
app.use('/movies', moviesRoutes);//Todad las peticiones de este archivo empezará con /movies
app.use('/songs', songsRoutes);


//Endpoints

app.get('/', (req, res) => {
    const {user}=req.session//Obtengo la información del usuario
    res.render("loginForm", user)
})

app.get('/signup', (req, res) => {

    res.render("signupForm")
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
        res
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
    
    const {username, password}=req.body//Obtengo los valores del body enviado en el json
    try{
        const id= await UserRepository.create({username, password});
        res.send({id})
    }catch(error){
        res.status(400).send(error.message)
    }
    
})


app.post('/logout', async(req,res)=> {

    res
    .clearCookie('access_token')//Elimino la cookie
    .json({message:'Logout successfull'})
    .send('logout');
    
});

app.get('/protected2',(req, res)=>{
    const {user}=req.session //Obtengo los datos de session del usuario
    if(!user) return res.status(403).render('unauthorized',{message:'Access denied'})
        res.render('protected2', user)
})

app.get('/protected', (req,res)=>{
      const {user}=req.session
    if (!user) return res.status(403).render('unauthorized',{message:'Access denied'})
    res.render('home',user)
})



//Funció per escoltar
app.listen(PORT, () => {
    console.log(`Server listing on http://localhost:${PORT}`);
});
