const btn_editat=document.getElementById('btn-form-editar')


btn_editat.addEventListener('submit', e=>{
    e.preventDefault()

    alert('Hola')
    console.log('Dentro')

    const titleSong=doc.getElementById('title').value
    const singer=doc.getElementById('singer').value
    const yearReleased=doc.getElementById('year').value

    const newSong={
        title:titleSong,
        singer:singer,
        year:yearReleased
    }

    fetch('/songs/songs/id',{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: newSong

    })

    .then(res=>{

        const song =res.json()

        if(res.ok){
            window.location.href=`/songs/show/${song.id}`
        }else{
            alert('Error al actualizar la cancion')
        }
    })
})