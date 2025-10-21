const $ = el => document.querySelector(el);

const formEditSong = $('#form-edit-song')
const btnCancelSong = $('#btn-form-cancel');


const formEditMovie=$('#form-edit-movie')
const btnCancelMovie=$('#btn-form-cancel');


/**Song */
formEditSong?.addEventListener('submit', e => {
    e.preventDefault()

    const titleSong = document.getElementById('title').value
    const singer = document.getElementById('singer').value
    const yearReleased = document.getElementById('year').value
    const idSong = $('#id-song').value

    const newSong = {
        title: titleSong,
        singer: singer,
        year: yearReleased
    }

    fetch(`/songs/songs/${idSong}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong)

    })

        .then(async (res) => {

            const song = await res.json()//Envia una promesa por eso tengo que hacer la función async y poner un await

            if (res.ok) {

                window.location.href = `/songs/show/${song.id}`
            } else {
                alert('Error al actualizar la cancion')
            }
        })
})

btnCancelSong?.addEventListener('click', () => {
    const idSong = $('#id-song').value

    window.location.href = `/songs/show/${idSong}`

})

/**Movies */


formEditMovie?.addEventListener('submit', e=>{
    e.preventDefault()

    const titleSong=document.getElementById('title').value
    const director=document.getElementById('director').value
    const yearReleased=document.getElementById('year').value
    const idMovie=$('#id-movie').value

    const newMovie={
        title:titleSong,
        director:director,
        year:yearReleased
    }

    fetch(`/movies/movies/${idMovie}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newMovie)

    })

    .then(async (res)=>{

        const movie =await res.json()//Envia una promesa por eso tengo que hacer la función async y poner un await

       if(res.ok){

            window.location.href=`/movies/show/${movie.id}`
        }else{
            alert('Error al actualizar la cancion')
        }
    })
})

btnCancelMovie?.addEventListener('click',()=>{
    const idMovie=$('#id-movie').value

    window.location.href=`/movies/show/${idMovie}`

})