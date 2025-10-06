import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json())
//Configura EJS com a motor de visualització
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs
const PORT=3000;
//Funció per llegir la informació
//readData();
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data)

    } catch (error) {
        console.log(error);
    }
};
//Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
}


app.get("/", (req, res) => {
    res.render("loginForm")
});


//Creem un endpoint per obtenir tots els llibres
app.get("/songs", (req, res) => {
    const data = readData();

    const user = { name: "Yeneviel" }
    const htmlMessage = `
   <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
   <a href="https://www.example.com">Visita Example</a>`;

    res.render("songs", { user, data, htmlMessage })
    //res.json(data.songs);
})

//Creem un endpoint per obtenir un llibre per un id
app.get("/songs/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const song = data.songs.find((song) => song.id === id);

    if (song == null) {

        res.status(404).json({ message: "Song not found" });
    } else {
        res.json(song);
    }

})

//Devuelve la página
app.get("/songs/songs/signup", (req, res) => {
    res.render("signupForm")
});


//Creem un endpoint del tipus post per afegir un llibre

app.post("/songs", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro

    const { title } = req.body//Treu la clau de l'objecte body
    const trobat = data.songs.find((song) => song.title === title)

    /**Otra forma de hacerlo
     * if(data.books.some((book)=> book.name===name)){
     * return res.status.(400).json({message:"Este libro ya existe"})
     * }
     * **/

    if (!trobat) {
        const newSong = {
            id: data.songs.length + 1,
            ...body,//Hace una copia del body
        };
        data.songs.push(newSong);
        writeData(data);
        res.json(newSong);
    } else {
        res.json({ message: "Este libro ya existe" })
    }

});


//Creem un endpoint per modificar un llibre


app.put("/songs/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const songIndex = data.songs.findIndex((song) => song.id === id);
    data.song[songIndex] = {
        ...data.song[songIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Book updated successfully" });
});

//Creem un endpoint per eliminar un llibre
app.delete("/songs/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const songIndex = data.songs.findIndex((song) => song.id === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1

    if (songIndex == -1) {
        res.status(404).json({ message: "Song not found" })
    } else {
        data.songs.splice(songIndex, 1);
        writeData(data);
        res.json({ message: "Song deleted successfully" });
    }

});

//Funció per escoltar
app.listen(PORT, () => {
    console.log(`Server listing on http://localhost:${PORT}`);
});
