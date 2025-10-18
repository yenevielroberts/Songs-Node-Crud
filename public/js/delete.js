
const btnDelete = document.getElementById('btn-delete');

btnDelete.addEventListener('click', () => {

    const confirmacion = confirm('Are you sure?');
    if (confirmacion == true) {

        const id_song = parseInt(document.getElementById('id_song').value)

        fetch(`/songs/songs/${id_song}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(res => {

                if (res.ok) {
                    window.location.href = '/songs';
                } else {
                    alert('error')
                }
            })
    } 
})