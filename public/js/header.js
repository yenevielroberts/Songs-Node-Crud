
const header = document.querySelector('header')
const nav = document.createElement('nav');

nav.innerHTML = `

    <a href="/">Home</a>
    <a href="/login">Log in</a>
    <a href="/signup">Sign up</a>
`;

header.appendChild(nav)

