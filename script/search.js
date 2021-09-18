import { autoComplete, getSearchEndP, getPopularSearchEP } from './getapi.js';
import { setFavGifs} from './fav.js'

/**
 * constantes
 * TODO revisar este listado y pasar junto con cada Función.
 */
export const inputTextSearch = document.querySelector('#inputSearch');
const offset = 12;
export const ulAutoComplete = document.querySelector('#searchBox-autocomplete');
const divSearchResults = document.querySelector('#searchResault-gif');
const divCateg = document.querySelector('#CategTextResult');
const searchTitle = document.getElementById('searchTitle')

/**
 * 
 * @description dispara petición de endpoint search y
 * dibuja html con resultados 
 * @param {inSearch} inSearch variable a buscar
 * revisar cantidad a dibujar (12 o mas)
 * TODO revisar offset
 * MOVER a main.js
 */
export const getSearch = (inSearch) =>{
  let search = inSearch;
  const searchArr =[];
  getSearchEndP(search, 12, offset)
  .then((res) => {
    const {data } = res;
    let searchResults ="";
    for (let i = 0; i < data.length; i++) {
      searchArr.push(data[i]);
    }
    for (let z = 0; z < searchArr.length; z++) {
      searchResults += markUpSearchResults(
          searchArr[z].images.fixed_height.url,
          searchArr[z].title,
          searchArr[z].username,
          searchArr[z].title,
          searchArr[z].id);
    }
    divSearchResults.innerHTML = searchResults;
    searchTitle.innerHTML = markUpSearchTitle(search)
    inputTextSearch.value = "";
    document.getElementById('rightSearchIcon').classList.add('glassCross')

  })
   .then(() =>{
    for (let sF = 0; sF < searchArr.length; sF++) {
      const searchFav = document.getElementById(`heart-${searchArr[sF].id}`);
      searchFav.addEventListener('click', function() {
        setFavGifs(`gif-${searchArr[sF].id}`,searchArr[sF].id);
      });
    }
  })

  .catch(err => console.warn('Error en la petición de busqueda',err))
}


/**
 * @description dibuja un Gifo. 
 * OK
 * 
 */
export const markUpSearchResults = (img,name,user,title, id) =>{
  return `
    <img class="show" src="${img}" id="${id}" alt="">
      <div class="divHover">
          <div class="divHover-btn">
              <i class="heart" id="heart-${id}"></i>
              <i class="down" id="down-${id}"></i>
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
 * @description dibuja el titulo del resultado de la busqueda
 * @param  title parametro que se busca
 * TODO mover a main.js 
 */
const markUpSearchTitle =(title)=>{
  return `
  <h1 id="searchTitle" class="mainTitle">${title}</h1>
  `
}


/**
 * @description llama al endpoint Autocomplete
 * @param inSeach el parametro de busqueda.
 * Dibuja el HTML en ul 
 * data y sugestArr son los mismo, se puede simplificar
 * TODO mover a main.js
 */
export const getAutoComplete = (inSearch) => {
  let search = inSearch;
  const sugestArr =[];
  autoComplete(search)
  .then((res) => {
    const {data} = res;
    let sugestSearch ="";
    for (let i = 0; i < data.length; i++) {
      sugestArr.push(data[i]);
    }
    for (let e = 0; e < sugestArr.length; e++) {
      sugestSearch += markUpAutoComplet(sugestArr[e].name);
    }
    ulAutoComplete.innerHTML = sugestSearch;
  })
  .then(() => {
    for (let t = 0; t < sugestArr.length; t++){
      let auto = document.getElementById(`item-${sugestArr[t].name}`);
      auto.addEventListener('click', ()=> {
        getSearch(sugestArr[t].name);
        ulAutoComplete.innerHTML =''
        });
      }
  })
  .then(() => {
  const i = document.getElementById('rightSearchIcon')
  i.classList.add('glassCross')
  i.addEventListener('click', () => {getSearch("");i.classList.remove('glassCross')  })

  })


  .catch((err) => console.warn('Error al hacer la petición', err) )
  
}


/**
 * @description recibe texto ingresado del InputText 
 * @returns dibuja el html con las sugerencias de busquedas
 * TODO ¿por que export?
 */
export const markUpAutoComplet = (sugest) =>{
  return `
  <li class="searchBox-autoC-list" id="item-${sugest}">
  <i class="iconGlass"></i> ${sugest}
  </li>
  `
}

/**
 * @description dibuja los nombres de busquedas populares debajo del titulo "Trending"
 * TODO MOVER a main.js
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
    for (let t = 0; t < 6; t++){
        let popu = document.getElementById(`pop-${popularArr[t]}`);
        popu.addEventListener('click', ()=> getSearch(popularArr[t]));
    }
  })

}

/**
 * @description dibuja el HTML con nombres busquedas populares
 * @param {name} name nombre de los resultados del endpoing busquedas populares
 * TODO mover a main.js
 */
export const markUpPopularSearch = (name) =>{
  return `<p id="pop-${name}" class="popuSearch">${name}</p>`
}