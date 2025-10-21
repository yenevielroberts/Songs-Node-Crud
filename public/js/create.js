const $ = el => document.querySelector(el);
const formCreateSong = $('#form-create-song');
const btnCancelSong = $('#btn-cancel-song');

const formCreateMovie=$('#form-create-movie');
const btnCancelMovie=$('#btn-cancel-movie');


/**Songs */
formCreateSong?.addEventListener('submit', e => {
    e.preventDefault()

    const titleSong = document.getElementById('title').value
    const singerSong = document.getElementById('singer').value
    const year = document.getElementById('year').value

    const newSong = {
        title: titleSong,
        singer: singerSong,
        year: year
    }

    fetch('/songs/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong)
    })
        .then(async (res) => {
            if (res.ok) {

                const song = await res.json()

                if (song.message) {
                    alert(song.message)
                } else {
                    window.location.href = `/songs/show/${song.id}`
                }

            } else {
                alert('error')
            }
        })
})

btnCancelSong?.addEventListener('click', () => {

    window.location.href = `/songs`

})


/**Movies */
formCreateMovie?.addEventListener('submit',e=>{
    e.preventDefault()

    const titleMovie=document.getElementById('title').value
    const director=document.getElementById('director').value
    const year=document.getElementById('year').value

    const newMovie={
        title:titleMovie,
        director:director,
        year:year
    }

    fetch('/movies/movies',{//Hago una petición
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    .then(async(res)=>{
        if(res.ok){
            
            const movie= await res.json()

            if(movie.message){
                alert(movie.message)
            }else{
                window.location.href=`/movies/show/${movie.id}`
            }
           

        }
    })
})

btnCancelMovie?.addEventListener('click',()=>{

    window.location.href=`/movies`

})