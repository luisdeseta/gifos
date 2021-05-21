import { autoComplete, getSearchEndP } from './getapi.js';

/**
 * @description dark theme button. cambia la clase de los elementos.
 * cambia el nombre del <p> en el menú
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
const inputTextSearch = document.querySelector('#inputSearch')
console.log("trae el campo de busqueda ", inputTextSearch.value)
const search = inputTextSearch.value;
const offset = 5
const ulAutoComplete = document.querySelector('#searchBox-autocomplete');
//console.log("trae el campo de UL ", ulAutoComplete)
const divSearchResults = document.querySelector('#searchContainer')
/**
 * Listeners
 */
inputTextSearch.addEventListener("keypress", (z) => doSearch(z))

//busqueda
const getSearch = () =>{
  getSearchEndP(search, 12, offset)
  .then((res) => {
    console.log("trae el endpoint del SEARCH", res);
    const {data } = res;
    let searchResults ="";
    console.log('*resultados html', searchResults)
    let searchArr =[];
    console.log('----trae searchArr', searchArr);
    for (let i = 0; i < data.length; i++) {
      searchArr.push(data[i]);
    }
    for (let z = 0; z < searchArr.length; z++) {
      searchResults += markUpSearchResults(searchArr[z].images.fixed_height.url);
    }
    divSearchResults.innerHTML = searchResults;
  })
  .catch(err => console.warn('Error en la petición de busqueda',err))
}


/**
 * @description texto del inputText
 * @returns dibuja el html 12 resultados
 */
 const markUpSearchResults = (img) =>{
  return `
  <div id="searchResult-gif-" class="searchResault-gif">
      <img src="${img}" alt="">
  </div>
  `
}

const doSearch = (z) =>{
  if (z.code === "Enter") {
    getSearch()
    //console.log(getSearch())
    //inputTextSearch.value =""
  }
}

/**
 * autocompletado
 * llama al endpoint Autocomplete
 * recibe el parametro de busqueda
 * dibuja el HTML 
 */
autoComplete(search)
.then((res) => {
  console.log("trae el endpoint de AUTOCOMPLE", res)
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

/**
 * @description texto ingresado del InputText en form busqueda 
 * @returns dibuja el html
 */
const markUpAutoComplet = (sugest) =>{
   return `
   <li class="searchBox-autocomplete-list">
   <a id="liValue-${sugest}" href="#">${sugest}</a>
   <i class="lupa"></i>
   </li>
  `
}

