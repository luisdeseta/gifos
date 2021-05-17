import { getSearchEndP } from './getapi.js';

/**dark theme button*/
const darkButton = document.getElementById("darkSwitch");

darkButton.addEventListener("click", () =>{
    const classArray = document.body.classList;
    darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";
    classArray.toggle("theme--dark");
});

//busqueda
// autocompletado
const inputTextSearch = document.querySelector('#inputSearch')
console.log(inputTextSearch.value)

const searchDo = () => {
  alert("hola")  
} 


const search = inputTextSearch.value;
const offset = 5
getSearchEndP(search, 12, offset)
.then((res) => {
  console.log(res)
})
.catch((err) =>{
  console.warn('Error al hacer la petición', err)
})