const form_edit=document.getElementById('form-edit-song')
const btn_cancel=document.getElementById('btn-form-cancel');
const id_song=document.getElementById('id_song').value


form_edit.addEventListener('submit', e=>{
    e.preventDefault()

    const titleSong=document.getElementById('title').value
    const singer=document.getElementById('singer').value
    const yearReleased=document.getElementById('year').value

    const newSong={
        title:titleSong,
        singer:singer,
        year:yearReleased
    }

    fetch(`/songs/songs/${id_song}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newSong)

    })

    .then(async (res)=>{

        const song =await res.json()//Envia una promesa por eso tengo que hacer la función async y poner un await

       if(res.ok){

            window.location.href=`/songs/show/${song.id}`
        }else{
            alert('Error al actualizar la cancion')
        }
    })
})

btn_cancel.addEventListener('click',()=>{

    window.location.href=`/songs/show/${id_song}`

})