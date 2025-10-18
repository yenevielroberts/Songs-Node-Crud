

const formCreateMovie=document.getElementById('form-create-movie');
const btn_cancelar=document.getElementById('btn-form-cancel');

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

    fetch('/movies/movies',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    .then(async(res)=>{
        if(res.ok){
            
            const movie= await res.json()
            window.location.href=`/movies/show/${movie.id}`
        }else{
            alert('error')
        }
    })
})

btn_cancelar.addEventListener('click',()=>{

    window.location.href=`/movies`

})