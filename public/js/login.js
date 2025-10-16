const $ = el => document.querySelector(el);

const loginForm = $('#login-form')
const loginSpan = $('#login-form span')

const logoutButton = $('#close-session')

loginForm?.addEventListener('submit', e => {
    e.preventDefault()
    const username = $('#login-username').value
    const password = $('#login-password').value

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            if (res.ok) {
                loginSpan.innerText = 'Session iniciada ..Entrando..'
                loginSpan.style.color = 'green'
                setTimeout(() => {
                    window.location.href = '/protected'
                }, 2000)
            } else {
                loginSpan.innerText = 'Error al iniciar session'
                loginSpan.style.color = 'red'
            }
        })
});

logoutButton?.addEventListener('click', e => {
    e.preventDefault()
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            console.log(res)
            window.location.href = '/'
        })
});