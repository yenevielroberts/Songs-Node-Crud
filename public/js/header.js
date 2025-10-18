
const header = document.querySelector('header')
const nav = document.createElement('nav');

nav.innerHTML = `

    <a href="/protected">Home</a>
    <a href="/">Log in</a>
    <a href="/signup">Sign up</a>
`;

header.style="display:flex; flex-direction:row; background-color:#9D174D; width:100%; height:70px; justify-content: right; align-items:centet;"

nav.style=" margin:5px; padding:5px;"

header.appendChild(nav)
