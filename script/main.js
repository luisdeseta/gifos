import { autoComplete, getSearchEndP } from './getapi.js';

/**dark theme button*/
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
/**
 * Listeners
 */
inputTextSearch.addEventListener("keypress", (z) => autoComplete(z))


//busqueda
getSearchEndP(search, 12, offset)
.then((res) => {
  console.log("trae el endpoint del SEARCH", res)
})
.catch((err) =>{
  console.warn('Error al hacer la petición', err)
})


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
  console.log("trae sugestArr", sugestArr)
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
   <li class="searchBox-autocomplete-list">${sugest}</li>
  `
}