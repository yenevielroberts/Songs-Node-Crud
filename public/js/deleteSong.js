
const btnDeleteSong = document.getElementById('btn-delete-song');

btnDeleteSong.addEventListener('click', () => {

    const confirmation = confirm('Are you sure?');
    if (confirmation == true) {

        const item_id = parseInt(document.getElementById('item_id').value)

        fetch(`/songs/songs/${item_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(res => {

                if (res.ok) {
                    window.location.href = '/songs';
                }
            })
    }
})


