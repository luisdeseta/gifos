import {downLoadModal, close, trendPagL,trendPagR, drawTrending, markUpSearchResults, setFavGifs, favoritesLS, autoComplete, getSearchEndP, getPopularSearchEP, download, gifoMaxBtn } from "./getapi.js";


//console.log("main.js favoritesLS => " + favoritesLS())

/**
 * constantes
 */
const divCateg = document.querySelector('#CategTextResult');
const inputTextSearch = document.querySelector('#inputSearch');
const divSearchResults = document.querySelector('#searchResault-gif');
const ulAutoComplete = document.querySelector('#searchBox-autocomplete');
const searchTitle = document.getElementById('searchTitle');
const i = document.getElementById('rightSearchIcon');
const leftSearchIcon = document.querySelector('#leftSearchIcon' );
const seeMoreButton = document.querySelector('#seeMoreButton');
const divSeeMore = document.querySelector('#seeMore');
const gifoMax = document.getElementById('gifoMax');

/**
 * @description muestra y oculata el boton ver más cuando se llega al tope
 * de Gifos para visualizar
 */
const seeMoreClass = ()=>{
  if (limitSeeMore == 50) {
    divSeeMore.style.display = "none";
    //document.getElementById('seeMore').classList.toggle('seeMore')
    //divSeeMore.classList.remove('seeMore')
  } else {
    divSeeMore.style.display = "flex"
    //document.getElementById('seeMore').classList.toggle('displayNone')
    //divSeeMore.classList.add('seeMore')
  }
}
divSeeMore.style.display = "none";

//Paginador de trending
const rBtn = document.getElementById('rigthbtn')
const lBtn = document.getElementById('leftbtn')

//boton ver mas
let limitSeeMore = 12;

/**
 * @description dibuja los nombres de busquedas populares debajo del titulo "Trending"
 * 
 */
const popularSearch = () => {
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
    //dispara la busqueda popular y guarda el termino en inputsearch 
    
    for (let t = 0; t < 6; t++){
      let popu = document.getElementById(`pop-${popularArr[t]}`);
      popu.addEventListener('click', ()=> {
        getSearch(popularArr[t]); 
        //guardo la busqueda popular en input search para boton ver mas 
        inputTextSearch.value=popularArr[t]
      
      });
    }
  })
  
}
/**
 * @description dibuja el HTML con nombres busquedas populares
 * @param {name} name nombre de los resultados del endpoing busquedas populares
 * 
 */
 const markUpPopularSearch = (name) =>{
  return `<p id="pop-${name}" class="popuSearch">${name}</p>`
}
popularSearch();

/**
 * 
 * @description dispara petición de endpoint search y
 * dibuja html con resultados 
 * @param {inSearch} inSearch variable a buscar
 * revisar cantidad a dibujar (12 o mas)
 * 
 * 
 */
const getSearch = (inSearch, limitSeeMore=12) =>{
  //let search = inSearch;
  const searchArr =[];
  getSearchEndP(inSearch, limitSeeMore)
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
      searchTitle.innerHTML = markUpSearchTitle(inSearch);
      //inputTextSearch.value = "";
      
    })
    //le agrego comportamiento a los iconos del Gifo
    .then(() =>{
      for (let sF = 0; sF < searchArr.length; sF++) {
        let searchFav = document.getElementById(`heart-${searchArr[sF].id}`);
        let down = document.getElementById(`down-${searchArr[sF].id}`);
        let max = document.getElementById(`max-${searchArr[sF].id}`);
        let img = document.getElementById(`${searchArr[sF].id}`);
        //guardo en favoritos
        searchFav.addEventListener('click', function () {setFavGifs(searchArr[sF].id),
        //icono activo (TODO)
          searchFav.classList.replace('heart','heartActive')});
        //download de un gifo
        down.addEventListener('click', function (){
          download(searchArr[sF].images.original.url, `Gifo ${searchArr[sF].title}`)
          console.log("ejecutando download...")
        })
        //maximizar desktop ---- MAX SEARCH ----
        max.addEventListener('click', async function(){
          await new Promise((resolve, reject) =>{
            resolve(
                //agrego la clase para mostrar el modal
                gifoMax.style.display ="flex",
                //dibuja el html
                gifoMax.innerHTML =  gifoMaxBtn(searchArr[sF].images.fixed_height.url, searchArr[sF].username, searchArr[sF].title, searchArr[sF].id)

            )
            
        }).then(()=>
              document.getElementById(`heartMax-${searchArr[sF].id}`).addEventListener('click', ()=>{
                  setFavGifs(searchArr[sF].id);
                  console.log("favModal...")
              }) 
              
          ).then(()=>{
            downLoadModal(`downMax-${searchArr[sF].id}`,searchArr[sF].images.original.url,`Gifo ${searchArr[sF].title}`);

          }).then(()=>{
              close();

          })
        
        })
        //maximizar mobile 
          img.addEventListener('click', async function(){
            await new Promise((resolve, reject) =>{
              resolve(
                  //agrego la clase para mostrar el modal
                  gifoMax.style.display ="flex",
                  //dibuja el html
                  gifoMax.innerHTML =  gifoMaxBtn(searchArr[sF].images.fixed_height.url, searchArr[sF].username, searchArr[sF].title, searchArr[sF].id)
                ) 
              }).then(()=>
                document.getElementById(`heartMax-${searchArr[sF].id}`).addEventListener('click', ()=>{
                    setFavGifs(searchArr[sF].id);
                    console.log("favModal...")
                }) 
              
              ).then(()=>{
                downLoadModal(`downMax-${searchArr[sF].id}`,searchArr[sF].images.original.url,`Gifo ${searchArr[sF].title}`);

              }).then(()=>{
                  close();

              })
          })
        }
    })
    //vacia el UL, borra la lupa, agrega boton "ver mas"
    .then(()=>{
      ulAutoComplete.innerHTML =''
      i.classList.remove('glassCross');
      leftSearchIcon.classList.remove('glassSearch');
      seeMoreClass()
    })
    .catch(err => console.warn('Error en la petición de busqueda =>',err))
  console.log(searchArr)
  }

/**
 * @description dibuja el titulo del resultado de la busqueda
 * @param  title parametro que se busca
 *  
 */
const markUpSearchTitle =(title)=>{
return `
<h1 id="searchTitle" class="mainTitle">${title}</h1>
`
}
/**
 * @description ejecuta busqueda dibuja el html
 * @param tecla enter
 * 
 */
const doSearch = (z) =>{
  
  if (z.keyCode === 13) {
    getSearch(inputTextSearch.value, limitSeeMore);
    //vacia la caja de busqueda
   

  }

}

/**
 * @description Ejecuta boton "ver mas"
 * 
 */
const seeMore = () =>{
  if (limitSeeMore >= 50){
    limitSeeMore = 50
  } else if (limitSeeMore == 48) {
    limitSeeMore +=2
  } else {
    limitSeeMore += 12;
  }
  console.log(limitSeeMore)
  getSearch(inputTextSearch.value, limitSeeMore);
}


/**
 * @description llama al endpoint Autocomplete
 * @param inSearch el parametro de busqueda.
 * Dibuja el HTML en ul 
 * data y sugestArr son los mismo, se puede simplificar
 * 
 */
 const getAutoComplete = (inSearch) => {
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
        i.classList.remove('glassCross');
        leftSearchIcon.classList.remove('glassSearch');
      });
      
    }
  })
  .then(() => {
    //    const i = document.getElementById('rightSearchIcon')
    i.classList.add('glassCross')
    leftSearchIcon.classList.add('glassSearch')
  //TODO ¿que hacia esto?
  //i.addEventListener('click', () => {getSearch("");i.classList.remove('glassCross')  })

  })
  .then(()=>{
    //si borro con backspace el campo busqueda, remuevo la cruz y la lupa
    if(inputTextSearch.value ===''){
      i.classList.remove('glassCross');
      leftSearchIcon.classList.remove('glassSearch');
    }

  })

  .catch((err) => console.warn('Error al hacer la petición', err) )
  
}


/**
 * @description recibe texto ingresado del InputText 
 * @returns dibuja el html con las sugerencias de busquedas
 * 
 */
const markUpAutoComplet = (sugest) =>{
return `
<li class="searchBox-autoC-list" id="item-${sugest}">
<i class="iconGlass"></i> ${sugest}
</li>
`
}

/**
 * @description ejecuta autocompletar sugerencias
 *  
 */  
const doAutoComplete = (z) =>{
  if (z.keyCode != 13) {
    getAutoComplete(inputTextSearch.value, limitSeeMore);

  }

}

/**
 * @description Elimina sugerencias de busqueda y vacia el SearchBox
 * 
 */

const clearCross = () =>{
    ulAutoComplete.innerHTML ='';
    inputTextSearch.value='';
    i.classList.remove('glassCross');
    leftSearchIcon.classList.remove('glassSearch');
}



drawTrending();
/**
 * Listeners
 */
inputTextSearch.addEventListener("keypress", doSearch)
inputTextSearch.addEventListener("keyup", doAutoComplete);
i.addEventListener("click", clearCross)
seeMoreButton.addEventListener("click", seeMore)
//Paginador
rBtn.addEventListener('click', () => { trendPagR(drawTrending) } );
lBtn.addEventListener('click', () => { trendPagL(drawTrending) });