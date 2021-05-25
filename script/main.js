import { getSearch, markUpSearchResults, getAutoComplete, markUpAutoComplet,  } from './search.js';

/**
 * @description dark theme button. cambia la clase de los elementos.
 * usar el metodo de Cris, ver local storage
 * */
 const darkButton = document.getElementById("darkSwitch");
 darkButton.addEventListener("click", () =>{
     const classArray = document.body.classList;
     darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";
     classArray.toggle("theme--dark");
 });
/**
 * constantes
 */
const inputTextSearch = document.querySelector('#inputSearch');

/**
 * @description ejecuta busqueda dibuja el html
 * @param tecla enter
 * 
 */
const doSearch = (z) =>{
  if (z.keyCode === 13) {
    getSearch(inputTextSearch.value);
  }
}
/**
 * @description ejecuta autocompletar sugerencias
 *  
 */  
const doAutoComplete = () =>{
  getAutoComplete(inputTextSearch.value);
  
}

/**
 * Listeners
 */
//inputTextSearch.addEventListener("keypress", doSearch);
//inputTextSearch.addEventListener("keyup", doAutoComplete);


const show = document.querySelector('.show')
const showDiv = document.querySelector('.divHover')
function test(){
  alert("hola")
}
function showMe() {
  const x = showDiv;
  if (x.style.display === "none") {
    x.style.display = "inline";
  } else {
    x.style.display = "none";
  }
}
show.addEventListener("mouseover", showMe)
//show.addEventListener("mouseout", showMe)