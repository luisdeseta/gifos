import { getSearch, getAutoComplete,popularSearch,inputTextSearch } from './search.js';
import { drawTrending, } from './trending.js';

 
/**
 * constantes
 */

 
/**
 * @description Ejecuta y dibuja las busquedas populares
 * 
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
inputTextSearch.addEventListener("keypress", doSearch)
inputTextSearch.addEventListener("keyup", doAutoComplete);