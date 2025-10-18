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
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } else {

            const data = readData();
            const movies=data.movies
            const user = { name: "Yeneviel" }
            if(movies!=null){
                res.render("movies/listMovies", { user, movies })

            }else{
                const message="Movie not found"
                res.status(404).render('movies/listMovies',{user, message  });
            }
            
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('noAutirozado',{ message: 'Internal server error' })
    }


})

//Obtengo la vista para crear una nueva canción
router.get("/movies", (req, res) => {

    try {
        //Compruebo accesso
        const { user } = req.session //Obtengo los datos de session del usuario

        if (!user) {
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } else {

            res.render("movies/createMovies")
        }
    } catch (error) {

        console.log(error);
        res.status(500).render('noAutorizado',{ message: 'Internal server error' })
    }

})

//Creem un endpoint per obtenir un formulario con los datos ya rellenados para editar
router.get("/movies/:id", (req, res) => {

    try {
        //compruebo accesso
        const { user } = req.session
        if (!user) {
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } {
            const data = readData();
            //Extraiem l'id de l'url recordem que req es un objecte tipus requets
            // que conté l'atribut params i el podem consultar
            const id = parseInt(req.params.id);
            const movie = data.movies.find((song) => song.id === id);

            if (movie == null) {

                res.status(404).json({ message: "Movie not found" });
            } else {
                res.render('movies/editMovies', { movie: movie });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('noAutorizado', {message:"Internal server error"})
    }


})
//Creem un endpoint per obtenir un peli per un id y mostrarlo en vista
router.get("/show/:id", (req, res) => {

    try {
        //compruebo accesso
        const { user } = req.session
        if (!user) {
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } else {
            const data = readData();
            //Extraiem l'id de l'url recordem que req es un objecte tipus requets
            // que conté l'atribut params i el podem consultar
            const id = parseInt(req.params.id);
            const movie = data.movies.find((song) => song.id === id);

            if (movie == null) {

                res.status(404).json({ message: "Movie not found" });
            } else {
                res.render('movies/detailMovies', { movie: movie });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('noAutorizado',{ message: 'Internal server error' })
    }


})


//Creem un endpoint del tipus post per afegir una canço
router.post("/movies", (req, res) => {

    try {
        //compruebo acceso
        const { user } = req.session
        if (!user) {
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } else {
            const data = readData();
            const body = req.body;
            //todo lo que viene en ...body se agrega al nuevo libro

            const { title } = req.body
            const { director } = req.body//Treu la clau de l'objecte body
            const trobat = data.movies.find((movie) =>{

                if(movie.title === title && movie.director===director){
                    return true
                }else{
                    return false
                }
            })//Miro si existe el libro antes de agregarlo

            /**Otra forma de hacerlo
             * if(data.books.some((book)=> book.name===name)){
             * return res.status.(400).json({message:"Este libro ya existe"})
             * }
             * **/

            if (!trobat) {
                const id = crypto.randomUUID()
                const newMovie = {
                    id: id,
                    ...body,//fa una copia del body
                };
                data.movies.push(newMovie);
                writeData(data);
                res.json(newMovie);
            } else {
                res.json({ message: "This movie already exists" })
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).render('noAutorizado',{ message: 'Internal server error' })
    }


});

//Creem un endpoint per modificar una canço
router.put("/movies/:id", (req, res) => {

    try {
        //compruebo acceso

        const { user } = req.session
        if (!user) {
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } else {
            const data = readData();
            const body = req.body;
            const id = parseInt(req.params.id);
            const movieIndex = data.movies.findIndex((song) => song.id === id);

            if (movieIndex != -1) {
                data.movies[movieIndex] = {//Combina los dos objetos y actualiza los campos del body  y deja intactos los demás.
                    ...data.movies[movieIndex],
                    ...body,
                };
                writeData(data);
                res.json({ message: "Movie updated successfully", id: id });
            } else {
                res.status(404).json({ message: 'Movie not found' })
            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).render('noAutorizado',{ message: 'Internal server error' })
    }

});


//Creem un endpoint per eliminar una canço
router.delete("/movies/:id", (req, res) => {

    try {
        //compruebo acceso

        const { user } = req.session

        if (!user) {
            return res.status(403).render('noAutorizado',{message:'Access denied'})
        } else {
            const data = readData();
            const id = parseInt(req.params.id);
            const movieIndex = data.songs.findIndex((song) => song.id === id);
            //splice esborra a partir de bookIndex, el número de elements 
            // que li indiqui al segon argument, en aquest cas 1

            if (movieIndex == -1) {
                res.status(404).json({ message: "Movie not found" })
            } else {
                data.movies.splice(movieIndex, 1);
                writeData(data);
                res.json({ message: "Movie deleted successfully" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).render('noAutorizado',{ message: 'Internal server error' })
    }
});

export default router;

