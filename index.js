import express from "express";
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json())
//Configura EJS com a motor de visualització
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs
const PORT=3000;



//Funció per escoltar
app.listen(PORT, () => {
    console.log(`Server listing on http://localhost:${PORT}`);
});
