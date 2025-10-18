
const formCreateSong = document.getElementById('form-create-song');
const btn_cancel = document.getElementById('btn-form-cancel');

formCreateSong.addEventListener('submit', e => {
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

btn_cancel.addEventListener('click', () => {

    window.location.href = `/songs`

})