
const header = document.querySelector('header')
const nameSite=document.createElement('p');

nameSite.textContent='MoSic Lovers';


header.style=" display:flex; flex-direction:row; background-color:#9D174D; width:100%; height:70px; justify-content:space between; color:white;";
nameSite.style='width:100%; font-size:20px; align-items:center; margin-left:5px;'

header.appendChild(nameSite)
