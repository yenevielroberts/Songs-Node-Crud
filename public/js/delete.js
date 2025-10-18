
const btnDelete = document.getElementById('btn-delete');

btnDelete.addEventListener('click', () => {

    const confirmacion = confirm('Are you sure?');
    if (confirmacion == true) {

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
                } else {
                    alert('error')
                }
            })
    } 
})