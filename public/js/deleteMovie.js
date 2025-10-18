const btnDeleteMovie = document.getElementById('btn-delete-movie');
btnDeleteMovie.addEventListener('click', () => {

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