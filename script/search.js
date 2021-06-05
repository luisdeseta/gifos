import { autoComplete, getSearchEndP, getPopularSearchEP } from './getapi.js';


/**
 * constantes
 */
const inputTextSearch = document.querySelector('#inputSearch');
const offset = 12;
const ulAutoComplete = document.querySelector('#searchBox-autocomplete');
const divSearchResults = document.querySelector('#searchResault-gif');
const divCateg = document.querySelector('#CategTextResult');


/**
 * 
 * @description dispara petición de end point y
 * dibuja html con resultados 
 * @param {inSearch} inSearch variable a buscar
 */
export const getSearch = (inSearch) =>{
  let search = inSearch;
  getSearchEndP(search, 12, offset)
  .then((res) => {
    const {data } = res;
    let searchResults ="";
    let searchArr =[];
    console.log('Array con paramettos Search',searchArr)
    for (let i = 0; i < data.length; i++) {
      searchArr.push(data[i]);
    }
    for (let z = 0; z < searchArr.length; z++) {
      searchResults += markUpSearchResults(
          searchArr[z].images.fixed_height.url,
          searchArr[z].title,
          searchArr[z].username,
          searchArr[z].title);
    }
    divSearchResults.innerHTML = searchResults;
    inputTextSearch.value = "";
    addListenerFav(searchArr[z].id)
  })
  .catch(err => console.warn('Error en la petición de busqueda',err))
}


/**
 * @description dibuja un Gifo
 * 
 */
export const markUpSearchResults = (img,name,user,title, id) =>{
  return `
    <img class="show" src="${img}" id="${id}" alt="">
      <div class="divHover">
          <div class="divHover-btn">
              <i class="heart" id="heart-${id}"></i>
              <i class="down" id="down-${name}"></i>
              <i class="max" id="max-${name}"></i>
          </div>
            <div class="divHover-user">
              <i class="user" id="user-">${user}</i>
              <i class="title" id="title-">${title}</i>
            </div>
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

/**
 * @description Endpoint de categorias
 * dibuja html debajo de Trending
 */
export const popularSearch = () => {
  const popularArr =[];
  getPopularSearchEP()
  .then((res)=>{
    const {data} = res;
    let listPop ="";
    for (let i = 0; i < data.length; i++) {
      popularArr.push(data[i]);
    }
    for (let e = 0; e < 6; e++) {
      listPop += markUpPopularSearch(popularArr[e]);
    }
    divCateg.innerHTML = listPop;
  })
  
  .then(() => {
    //const {data} = res;
    for (let t = 0; t < popularArr.length; t++){
        let popu = document.getElementById(`pop-${popularArr[t]}`);
        popu.addEventListener('click', ()=> test(popularArr[t]));
    }
    
  })

}

const test = (gifo) =>{
  console.log(gifo)
}

export const markUpPopularSearch = (name) =>{
  return `<p id="pop-${name}">${name}</p>`
}


