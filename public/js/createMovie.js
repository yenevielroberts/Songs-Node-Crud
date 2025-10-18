

const formCreateMovie=document.getElementById('form-create-movie');
const btn_cancel=document.getElementById('btn-form-cancel');

formCreateMovie.addEventListener('submit',e=>{
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

btn_cancel.addEventListener('click',()=>{

    window.location.href=`/movies`

})