import { getSearch, markUpSearchResults, getAutoComplete, categ, TrendingGif } from './search.js';
//import { TrendingGif } from './trending';


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
const testing = document.querySelector('.heart');


/**
 * @description Ejecuta y dibuja las categorias en Trending
 * REVISAR!!
 */
//categ();

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
  TrendingGif(limit, offset);
}
//doTrending()
/**
 * Listeners
 */
inputTextSearch.addEventListener("keypress", doSearch);
inputTextSearch.addEventListener("keyup", doAutoComplete);



/**
 * Testing
 * BORRAR ANTES DE LA ENTREGA FINAL
 */
const test =()=>{
  alert("Prueba");
}

testing.addEventListener('click', test);
