const form_edit=document.getElementById('form-edit-movie')
const btn_cancelar=document.getElementById('btn-form-cancelar');
const id_movie=document.getElementById('id_movie').value


form_edit.addEventListener('submit', e=>{
    e.preventDefault()

    const titleSong=document.getElementById('title').value
    const director=document.getElementById('director').value
    const yearReleased=document.getElementById('year').value

    const newMovie={
        title:titleSong,
        director:director,
        year:yearReleased
    }

    fetch(`/movies/movies/${id_movie}`,{
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

btn_cancelar.addEventListener('click',()=>{

    window.location.href=`/movies/show/${id_movie}`

})