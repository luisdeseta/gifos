import { APIKEY, AUTOCOMPLETE, SEARCH, TRENDING,GIFSBYID, POPULARSEARCH, UPLOAD} from './variables.js';
//Constantes//

let offSet = 0 

/**
 * @description obtener json del endpoint search
 * @search parametro a buscar (obligatorio)
 * @limit cantidad de resultados a mostrar
 * @offset orden dentro del json
 *
 */

export const getSearchEndP = (search,limit,offset=0) =>{
    return new Promise((resolve, reject) =>{
        fetch(`${SEARCH}?api_key=${APIKEY}&q=${search}&limit=${limit}&offset=${offset}&lang=es`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
}

/**
* @description autocompletar el campo de busqueda
* @search parametro a buscar (obligatorio)
*/

export const autoComplete = (search) =>{
    return new Promise ((resolve, reject)=>{
        fetch(`${AUTOCOMPLETE}?api_key=${APIKEY}&q=${search}&limit=4`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}
/**
* @description endpoint de busquedas populares
* 
*/
export const getPopularSearchEP = () => {
    return new Promise ((resolve, reject) => {
        fetch(`${POPULARSEARCH}?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

/**
 * @description endpoint de Trending
 * @param offSetTrend=0
 * @param limitTrend=3
 */
export async function getTrending(limitTrend=3, offSetTrend=0) {
    const trendy = await fetch(`${TRENDING}?api_key=${APIKEY}&limit=${limitTrend}&offset=${offSetTrend}`);
    const res = await trendy.json();
    return res
}

/**
 * @description endpoint de GIFs by id
 * @param ids a consultar
 * 
 */
 export async function getGifosByIDs(ids) {
    const gifs = await fetch(`${GIFSBYID}?api_key=${APIKEY}&ids=${ids}`);
    const res = await gifs.json();
    return res
}

/**
 * @description Descarga un Gifo
 * @param url link de la imagen del Gifo a descargar
 * @param title nombre del archivo a descargar
 */
 export async function download (url, title) {
    //console.log("gifos; ", url);
    const gif = await fetch(url);
    const gifBlob = await gif.blob();
    const gifUrl = URL.createObjectURL(gifBlob)
    
    const link = document.createElement('a');
    link.href = gifUrl;
    link.download = title;
    link.click()
}

/**
 * @description Maximiza un gifo
 * @url Imagen que se desea mostrar
 * @user nombre del usuario del Gifo
 * @title titulo el gifo
 */
export function gifoMaxBtn (url,user,title, id){
    return `
    <div id="closeMax" class="closeMax">
        <i id="closeX" class="closeX"> </i>
    </div>
    <div id="gifoMaxContainer" class="gifoMaxContainer">
        <div id="imgMax" class="imgMax">
            <img src="${url}" alt="Gifo en pantalla completa">
        </div>
    <div id="gifoMaxFooter" class="gifoMaxFooter">
        <div class="box1">
        <p class="user" >${user}</p>
        <p class="title" >${title}</p>
        </div>
        <div class="box2">
        <i class="heart" id="heartMax-${id}"></i>
        <i class="down" id="downMax-${id}"></i>
        </div>
    </div>
    `
}



/**
 * @description Upload del gif grabado por el usuario
 * @param data archivo para subir
 * 
 */ 
export const uploadGifo = (data) =>{
    return new Promise ((resolve, reject) => {
        fetch(`${UPLOAD}?api_key=${APIKEY}&file=${data}`,{ method: 'POST', body: data})
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}


/**
 * 
 * @description Recupera los datos de Local Storage y lo retorna como un objeto (parse)
 * si el localstorage está vacio retorna un array vacio
 * 
 */
 export const favoritesLS = () =>{
    let i = JSON.parse(localStorage.getItem('gifosFav'))
    if (!i){
        return []
    } else {
        return JSON.parse(localStorage.getItem('gifosFav'))
    }
}


/**
 * @description Guardar Gif en LocalStorage en formato string
 * @param id id del gifo
 * 
 */

 export const setFavGifs = (id) =>{
    let fav = favoritesLS();//array del LocalStorage
    let i = fav.indexOf(id)
    //console.log("fav " + fav)
    if (i != -1) {
        fav.splice(i,1)
    } else {
        fav.unshift(id)
        
    }
    let favLS = JSON.stringify(fav);
    localStorage.setItem('gifosFav', favLS);
    //console.log("fav ===> " + favLS);
}

/**
 * @description dibuja un Gifo. Tiene botones: Heart, Down y Max.
 * 
 */
 export const markUpSearchResults = (img,name,user,title, id) =>{
    return `
    <img class="show" src="${img}" id="${id}" alt="">
    <div class="divHover">
    <div class="divHover-btn">
    <i class="heart" id="heart-${id}"></i>
    <i class="down" id="down-${id}"></i>
    <i class="max" id="max-${id}"></i>
    </div>
    <div class="divHover-user">
    <i class="user" id="user-">${user}</i>
    <i class="title" id="title-">${title}</i>
            </div>
      </div>
  `
  }

/**
 * @description dibuja un Gifo para seccion Mis Gifos. 
 * Tiene botones: Eliminar, Down y Max.
 * 
 */
export const markUpMyGifos = (img,name,user,title, id) =>{
return `
<img class="show" src="${img}" id="${id}" alt="">
<div class="divHover">
<div class="divHover-btn">
<i class="delete" id="delete-${id}"></i>
<i class="down" id="down-${id}"></i>
<i class="max" id="max-${id}"></i>
</div>
<div class="divHover-user">
<i class="user" id="user-">${user}</i>
            <i class="title" id="title-">${title}</i>
        </div>
    </div>
`
}
  /**
 * @description Dibuja trending en index y agregar comportamiento a los botones
 * @param {*} limit 3
 * @param {*} offset inicia en cero
 * 
 */
 export function drawTrending (limit=3, offset=0) {
    const divTrend = document.querySelector('#trendGifos-Container')
    const trendArr =[];
    getTrending(limit, offset)
    .then((res) => {
        const {data} = res;    
        let trend ='';
        for (let i = 0; i < data.length; i++) {
            trendArr.push(data[i]);
        }
        for (let t = 0; t < trendArr.length; t++) {
            trend += markUpSearchResults(
                trendArr[t].images.downsized_medium.url,
                trendArr[t].title,
                trendArr[t].username,
                trendArr[t].title,
                trendArr[t].id);
            }
            divTrend.innerHTML = trend;
        })
        // le agrego comportamiento a los botones
        .then(() => {
            for (let t = 0; t < trendArr.length; t++){
                let searchfav = document.getElementById(`heart-${trendArr[t].id}`);
                let down = document.getElementById(`down-${trendArr[t].id}`);
                let max = document.getElementById(`max-${trendArr[t].id}`);
                let img = document.getElementById(trendArr[t].id);
                searchfav.addEventListener('click', function() {
                  setFavGifs(trendArr[t].id);
                });
                down.addEventListener('click', function (){
                  download(trendArr[t].images.original.url, `Gifo ${trendArr[t].title}`)
                })
                max.addEventListener('click', function(){
                  //agrego la clase para mostrar el modal
                  gifoMax.style.display ="flex"
                  //dibuja el html
                  gifoMax.innerHTML = gifoMaxBtn(trendArr[t].images.downsized.url, trendArr[t].username, trendArr[t].title, trendArr[t].id);
                  //download desde el modal
                  document.getElementById(`downMax-${trendArr[t].id}`).addEventListener('click', function (){
                    download(trendArr[t].images.original.url, `Gifo ${trendArr[t].title}`)
                  })
                  //fav desde el modal
                  document.getElementById(`heartMax-${trendArr[t].id}`).addEventListener('click', function() {
                    setFavGifs(trendArr[t].id);
                  });
                  //quito la clase para cerrar el modal
                  const closeMax = document.getElementById('closeMax');
                  closeMax.addEventListener('click', () =>{gifoMax.style.display = "none"})
                })
                //maximizar mobile ---- ----
                img.addEventListener('click', async function(){
                    await new Promise((resolve, reject) =>{
                        resolve(
                            //agrego la clase para mostrar el modal
                            gifoMax.style.display ="flex",
                            //dibuja el html
                            gifoMax.innerHTML =  gifoMaxBtn(trendArr[t].images.fixed_height.url, trendArr[t].username, trendArr[t].title, trendArr[t].id)
                          ) 
                        }).then(()=>
                          document.getElementById(`heartMax-${trendArr[t].id}`).addEventListener('click', ()=>{
                              setFavGifs(trendArr[t].id);
                              console.log("favModal...")
                          }) 
                        
                        ).then(()=>{
                          downLoadModal(`downMax-${trendArr[t].id}`,trendArr[t].images.original.url,`Gifo ${trendArr[t].title}`);
          
                        }).then(()=>{
                            close();
          
                        })
                
                })
              
            
            
            }
          })
  }



  /**
 * @description Paginador. cambia el offset y suma 3
 * @param draw callback para poder llamar a la funcion que dibuja los trending
 * y poder reutilizar el paginador en otras paginas
 */
export function trendPagR (draw) {
    if (offSet === 50) {
        offSet = 50
    } else {

        offSet += 3;
    }
    let limit=3
    console.log(offSet)
   draw(limit, offSet)
}

/**
 * @description Paginador. cambiar el offset y resta 3
 * @param draw callback para poder llamar a la funcion que dibuja los trending
 * y poder reutilizar el paginador en otras paginas
 */
  export function trendPagL (draw) {
    if (offSet <= 0) {
        offSet = 0
    } else {
        offSet -= 3;

    }
     let limit=3
     console.log(offSet)
     draw(limit, offSet)  
 }


 /**
 * @description Recupera del LocalStorage misGifos guardados
 * los retorna como objeto
 */
export function myGifosLS (){
    let i = JSON.parse(localStorage.getItem('myGif'))
    if (!i){
        return []
    } else {
        return JSON.parse(localStorage.getItem('myGif'))
    }
}

/**
 * @description Guardar el ID de la grabacion en LocalStorage en formato string
 * @param id del gifo que devuelve la grabación
 */
export function setMyGifosLS (id) {
    let myGifos = myGifosLS();//array del LocalStorage
    console.log("myGifos =>  " + myGifos)
    let i = myGifos.indexOf(id)
    if (i != -1) {
        myGifos.splice(i,1)
    } else {
        myGifos.unshift(id)
        
    }
    let gifoLS = JSON.stringify(myGifos);
    localStorage.setItem('myGif', gifoLS);
}

/**
 * @description cierra el modal
 * 
 */
export function close () {
    document.getElementById('closeMax').addEventListener('click', 
        () =>{gifoMax.style.display = "none";
        
        console.log("close..");
        })
}

/**
 * @description Realiza el download desde el modal
 * @param {} id id del icono download del gifo dibujado (hace getElementById)
 * @param {*} url url para hacer download
 * @param {*} title nombre del gifo
 */
export function downLoadModal (id, url, title){
    document.getElementById(id).addEventListener('click', function (){
        download(url, title)
        console.log("ejecutando download...")
      })
}

