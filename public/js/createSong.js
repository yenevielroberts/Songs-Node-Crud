
const formCreateSong=document.getElementById('form-create-song');

formCreateSong.addEventListener('submit',e=>{
    e.preventDefault()

    const titleSong=document.getElementById('title').value
    const singerSong=document.getElementById('singer').value
    const year=document.getElementById('year').value

    const newSong={
        title:titleSong,
        singer:singerSong,
        year:year
    }

    fetch('/songs/songs',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong)
    })
    .then(async(res)=>{
        if(res.ok){
            
            const song= await res.json()
            window.location.href=`/songs/show/${song.id}`
        }else{
            alert('error')
        }
    })
})
