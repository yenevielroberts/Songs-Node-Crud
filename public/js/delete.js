const $ = el => document.querySelector(el);

const btnDeleteSong = $('#btn-delete-song');
const btnDeleteMovie = $('#btn-delete-movie');

btnDeleteSong?.addEventListener('click', () => {

    const confirmation = confirm('Are you sure?');
    if (confirmation == true) {

        const item_id = document.getElementById('item_id').value

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


btnDeleteMovie?.addEventListener('click', () => {

    const confirmation = confirm('Are you sure?');
    if (confirmation == true) {

        const item_id = document.getElementById('item_id').value

        fetch(`/movies/movies/${item_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(res => {

            if (res.ok) {
                window.location.href = '/movies';
            }
        })
    }
})


