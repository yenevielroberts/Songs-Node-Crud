import express from 'express'; //importamos express
import fs from 'fs'; //importamos fs para gestionar archivos
import crypto from 'node:crypto';

const router = express.Router();

//Funció per llegir la informació
//readData();
const readData = () => {
    try {
        const data = fs.readFileSync("./db/db.json");
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
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
}

//Endpoints
router.get("/", (req, res) => {

    try {
        //Compruebo el accesso
        const { user } = req.session //Obtengo los datos de session del usuario

        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } else {

            const data = readData();
            const user = { name: "Yeneviel" }
            const songs=data.songs
            res.render("songs/listSongs", { user, songs })
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('unauthorized',{ message: 'Internal server error' })
    }


})

//Obtengo la vista para crear una nueva canción
router.get("/songs", (req, res) => {

    try {
        //Compruebo accesso
        const { user } = req.session //Obtengo los datos de session del usuario

        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } else {

            res.render("songs/createSong")
        }
    } catch (error) {

        console.log(error);
        res.status(500).render('unauthorized',{ message: 'Internal server error' })
    }

})

//Creem un endpoint per obtenir un formulario con los datos ya rellenados para editar
router.get("/songs/:id", (req, res) => {

    try {
        //compruebo accesso
        const { user } = req.session
        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } {
            const data = readData();
            //Extraiem l'id de l'url recordem que req es un objecte tipus requets
            // que conté l'atribut params i el podem consultar
            const id = req.params.id;
            const song = data.songs.find((song) => song.id === id);

            if (song == null) {

                res.status(404).json({ message: "Song not found" });
            } else {
                res.render('songs/editSong', { song });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('unauthorized', {message:"Internal server error"})
    }


})
//Creem un endpoint per obtenir una canço per un id y mostrarlo en vista
router.get("/show/:id", (req, res) => {

    try {
        //compruebo accesso
        const { user } = req.session
        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } else {
            const data = readData();
            //Extraiem l'id de l'url recordem que req es un objecte tipus requets
            // que conté l'atribut params i el podem consultar
            const id = req.params.id;
            const song = data.songs.find((song) => song.id === id);

            if (song == null) {

                res.status(404).json({ message: "Song not found" });
            } else {
                res.render('songs/detailSong', { song });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('unauthorized',{ message: 'Internal server error' })
    }


})


//Creem un endpoint del tipus post per afegir una canço
router.post("/songs", (req, res) => {

    try {
        //compruebo acceso
        const { user } = req.session
        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } else {
            const data = readData();
            const body = req.body;
            //todo lo que viene en ...body se agrega al nuevo libro

            const { title } = req.body//Treu la clau de l'objecte body
            const trobat = data.songs.find((song) => song.title === title)//Miro si existe el libro antes de agregarlo

            /**Otra forma de hacerlo
             * if(data.books.some((book)=> book.name===name)){
             * return res.status.(400).json({message:"Este libro ya existe"})
             * }
             * **/

            if (!trobat) {
                const id = crypto.randomUUID()
                const newSong = {
                    id:id,
                    ...body,//fa una copia del body
                };
                data.songs.push(newSong);
                writeData(data);
                res.json(newSong);
            } else {
                res.json({ message: "This song already exists" })
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('unauthorized',{ message: 'Internal server error' })
    }


});

//Creem un endpoint per modificar una canço
router.put("/songs/:id", (req, res) => {

    try {
        //compruebo acceso

        const { user } = req.session
        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } else {
            const data = readData();
            const body = req.body;
            const id = req.params.id;
            const songIndex = data.songs.findIndex((song) => song.id === id);

            if (songIndex != -1) {
                data.songs[songIndex] = {//Combina los dos objetos y actualiza los campos del body  y deja intactos los demás.
                    ...data.songs[songIndex],
                    ...body,
                };
                writeData(data);
                res.json({ message: "Song updated successfully", id: id });
            } else {
                res.status(404).json({ message: 'Song not found' })
            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).render('unauthorized',{ message: 'Internal server error' })
    }

});


//Creem un endpoint per eliminar una canço
router.delete("/songs/:id", (req, res) => {

    try {
        //compruebo acceso

        const { user } = req.session

        if (!user) {
            return res.status(403).render('unauthorized',{message:'Access denied'})
        } else {
            const data = readData();
            const id = req.params.id;
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
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('unauthorized',{ message: 'Internal server error' })
    }
});

export default router;


/*

se combianan los dos objetos y actualiza los campos del body  y deja intactos los demás.
Pone todos los campos y si hay dos con el mismo nombre los sobreescribe con el valor del body y deja un solo
 data.songs[songIndex] = {
        ...data.songs[songIndex],
        ...body,
    };

*/