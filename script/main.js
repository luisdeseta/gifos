import { getSearch, getAutoComplete,popularSearch } from './search.js';
import { drawTrending } from './trending.js';


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
 * @description Ejecuta y dibuja las busquedas populares
 * REVISAR!!
 */
 popularSearch();

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
 * @description ejecuta Trending
 */
const doTrending = (limit=3, offset=0) =>{
  drawTrending();
 
}
doTrending()
/**
 * Listeners
 */
inputTextSearch.addEventListener("keypress", doSearch);
inputTextSearch.addEventListener("keyup", doAutoComplete);




