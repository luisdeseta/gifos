import { autoComplete, getSearchEndP } from './getapi.js';


/**
 * constantes
 */
const inputTextSearch = document.querySelector('#inputSearch');
const offset = 12;
const ulAutoComplete = document.querySelector('#searchBox-autocomplete');
const divSearchResults = document.querySelector('#searchContainer')

//busqueda
export const getSearch = (inSearch) =>{
  let search = inSearch;
  getSearchEndP(search, 12, offset)
  .then((res) => {
    const {data } = res;
    let searchResults ="";
    let searchArr =[];
    console.log(searchArr)
    for (let i = 0; i < data.length; i++) {
      searchArr.push(data[i]);
    }
    for (let z = 0; z < searchArr.length; z++) {
      searchResults += markUpSearchResults(searchArr[z].images.fixed_height.url);
    }
    divSearchResults.innerHTML = searchResults;
    inputTextSearch.value = "";
  })
  .catch(err => console.warn('Error en la petición de busqueda',err))
}


/**
 * @description texto del inputText
 * @returns dibuja el html 12 resultados
 */
export const markUpSearchResults = (img) =>{
  return `
  <div id="searchResault-gif-" class="searchResault-gif">
  <img src="${img}" alt="">
  </div>
  `
}



/**
 * @description llama al endpoint Autocomplete
 * recibe el parametro de busqueda
 * dibuja el HTML en ul 
 * res y sugestArr son los mismo, se puede simplificar
 */
export const getAutoComplete = (inSearch) => {
  let search = inSearch;
  autoComplete(search)
  .then((res) => {
    //console.log("trae el endpoint de AUTOCOMPLE", res)
    const {data} = res;
    let sugestSearch ="";
    let sugestArr =[];
    for (let i = 0; i < data.length; i++) {
      sugestArr.push(data[i]);
    }
    for (let e = 0; e < sugestArr.length; e++) {
      sugestSearch += markUpAutoComplet(sugestArr[e].name);
    }
    ulAutoComplete.innerHTML = sugestSearch;
    //console.log("trae sugestArr ", sugestArr)
  })
  .catch((err) =>{
    console.warn('Error al hacer la petición', err)
  })
}

/**
 * @description dispara busqueda sugerida
 * @param busqueda cuando hace click 
 */
const sugestTrigger = (ii) =>{
  const a = document.querySelectorAll('.searchBox-autoC-list');
  a.forEach((i) =>{
    i.addEventListener('click', doSearch(ii))
    //ulAutoComplete.innerHTML = "";
  })
}



/**
 * @description texto ingresado del InputText en form busqueda 
 * @returns dibuja el html
 */
export const markUpAutoComplet = (sugest) =>{
  return `
  <li class="searchBox-autoC-list" id="item-${sugest}">
  <i class="iconGlass"></i> ${sugest}
  </li>
  `
}


