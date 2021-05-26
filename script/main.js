import { getSearch, markUpSearchResults, getAutoComplete, markUpAutoComplet, categ, markUpCategories } from './search.js';

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
categ();

/**
 * Listeners
 */
inputTextSearch.addEventListener("keypress", doSearch);
inputTextSearch.addEventListener("keyup", doAutoComplete);


/**
 * mostrar y ocultar iconos sobre el gif
 */
const show = document.querySelector('.show')
const showDiv = document.querySelector('.divHover')

function showMe() {
  const x = showDiv;
    x.style.visibility = "visible";
}
function hideMe() {
  const x = showDiv;
  x.style.visibility = "hidden";
}

show.addEventListener("mouseover", showMe)
showDiv.addEventListener("mouseout", hideMe)