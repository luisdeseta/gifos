import { autoComplete, getSearchEndP, getCategorie,getTrending } from './getapi.js';


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

/**
 * @description Endpoint de categorias
 * dibuja html debajo de Trending
 */
export const categ = () => {
  getCategorie()
  .then((res)=>{
    const {data} = res;
    let listCateg ="";
    let categArr =[];
    //console.log('array categ ', categArr)
    //console.log('listCateg', listCateg)
    for (let i = 0; i < data.length; i++) {
      categArr.push(data[i]);
    }
    for (let e = 0; e < 6; e++) {
      listCateg += markUpCategories(categArr[e].name);
    }
    divCateg.innerHTML = listCateg;

  })
}

export const markUpCategories = (name) =>{
  return `<p>${name}</p>`
}

/**
 * @description agrega un Listener active al boton Fav
 * agrega o quita clase a la img del gifo 
 */
 export const addListenerFav =()=>{
  let fav = document.querySelectorAll(".heart");
  let test = () =>{
    alert("prueba")
  }
  fav.forEach((element) => {
  element.addEventListener('click', test);
    
  });
 }
const addListenerIdGif = (id) => {
  document.getElementsByClassName(id).classList.toggle('favorite')
}
