import {close,downLoadModal, favoritesLS, trendPagL,trendPagR,setFavGifs,getTrending, markUpSearchResults, getGifosByIDs, download,gifoMaxBtn} from "./getapi.js";

//constantes
const rBtn = document.getElementById('rigthbtn')
const lBtn = document.getElementById('leftbtn')
const gifoMax = document.getElementById('gifoMax');
const empty = document.querySelector('#favEmpty');
const seeMoreButton = document.querySelector('#seeMoreButton');

//Limite del boton Ver más en favoritos
let favLimit = 12

/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 */
const drawFav = (callback)=>{
    const divFav = document.querySelector('#favResault-gif');
    let fav ='';
    let dataHeart =[];
    let savedFav = callback; 
    let drawed = savedFav.slice(0,favLimit).length
    console.log("savedFav => ",savedFav.length)
    console.log("drawed => " + drawed)
    if ( savedFav.length === 0 ) return divFav.innerHTML =""  
    //.reverse para mostar primero el ultimo Fav marcado
    getGifosByIDs(savedFav.slice(0,favLimit))
    .then( (res) => {
        const {data} = res;
        for (let f = 0; f < data.length; f++) {
            fav += markUpSearchResults(
                data[f].images.downsized_medium.url,
                data[f].title,
                data[f].username,
                data[f].title,
                data[f].id);
                dataHeart.push(data[f]);
                
            }
            
            divFav.innerHTML = fav;
        })
        //Agrega comportamiento a los favoritos insertados
        .then(() => {
            for (let t = 0; t < dataHeart.length; t++){
                let favy = document.getElementById(`heart-${dataHeart[t].id}`);
                let down = document.getElementById(`down-${dataHeart[t].id}`);
                let max = document.getElementById(`max-${dataHeart[t].id}`);
                let img = document.getElementById(dataHeart[t].id);
                //guardo en favoritos
                favy.addEventListener('click', ()=> {
                    setFavGifs(dataHeart[t].id);
                    drawFav(favoritesLS());
                    favEmpty();
                })
                //download de un gifo
                down.addEventListener('click', function (){
                    download(dataHeart[t].images.original.url, `Gifo ${dataHeart[t].title}`)
                    console.log("ejecutando download...")
                })
                //maximizar un gifo - === DRAWFAV ===
                max.addEventListener('click', async function(){
                    await new Promise((resolve, reject) =>{
                        resolve(
                            //agrego la clase para mostrar el modal
                            gifoMax.style.display ="flex",
                            //dibuja el html
                            gifoMax.innerHTML =  gifoMaxBtn(dataHeart[t].images.fixed_height.url, dataHeart[t].username, dataHeart[t].title, dataHeart[t].id)

                        )
                        
                    }).then(()=>
                        document.getElementById(`heartMax-${dataHeart[t].id}`).addEventListener('click', ()=>{
                            setFavGifs(dataHeart[t].id);
                            drawFav(favoritesLS());
                            favEmpty();
                            console.log("favModal...")
                        }) 
                        
                    ).then(()=>{
                        downLoadModal(`downMax-${dataHeart[t].id}`,dataHeart[t].images.original.url,`Gifo ${dataHeart[t].title}`);

                    }).then(()=>{
                        close();

                    })
                })
                img.addEventListener('click', async function(){
                    await new Promise((resolve, reject) =>{
                      resolve(
                          //agrego la clase para mostrar el modal
                          gifoMax.style.display ="flex",
                          //dibuja el html
                          gifoMax.innerHTML =  gifoMaxBtn(dataHeart[t].images.fixed_height.url, dataHeart[t].username, dataHeart[t].title, dataHeart[t].id)
                        ) 
                      }).then(()=>
                        document.getElementById(`heartMax-${dataHeart[t].id}`).addEventListener('click', ()=>{
                            setFavGifs(dataHeart[t].id);
                            console.log("favModal...")
                        }) 
                      
                      ).then(()=>{
                        downLoadModal(`downMax-${dataHeart[t].id}`,dataHeart[t].images.original.url,`Gifo ${dataHeart[t].title}`);
        
                      }).then(()=>{
                          close();
        
                      })
                  })
            }
        })
        //compruebo la cantidad de gifos dibujados y en favoritos para 
        // ocultar el boton Ver mas
        if (drawed == savedFav.length) {
            seeMoreButton.classList.add('displayNone')
        } else if (savedFav.length > 12 ){
            seeMoreButton.classList.remove('displayNone')
        } else if (savedFav.length < 12){
            seeMoreButton.classList.add('displayNone')
        }
        
    }
    
/**
 * @description Dibuja trending en fav.html y agregar comportamiento a los botones
 * @param limit Revisar para paginancion
 * @param offset revisar para paginacion
 * 
 */
function drawTrendingFav(limit=3, offset=0) {
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
        .then(() => {
            for (let t = 0; t < trendArr.length; t++){
                let searchfav = document.getElementById(`heart-${trendArr[t].id}`);
                let down = document.getElementById(`down-${trendArr[t].id}`);
                let max = document.getElementById(`max-${trendArr[t].id}`);
                let img =document.getElementById(`${trendArr[t].id}`);
                searchfav.addEventListener('click', function() {
                    setFavGifs(trendArr[t].id);
                    drawFav(favoritesLS());
                    favEmpty();
                });
                down.addEventListener('click', function (){
                    download(trendArr[t].images.original.url, `Gifo ${trendArr[t].title}`)
                    console.log("ejecutando download...")
                })
                max.addEventListener('click', async function(){
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
                            drawFav(favoritesLS());
                            favEmpty();
                            console.log("favModal...")
                        }) 
                        
                    ).then(()=>{
                        downLoadModal(`downMax-${trendArr[t].id}`,trendArr[t].images.original.url,`Gifo ${trendArr[t].title}`);

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
 * @description Si no hay favoritos guardados muestra pagina vacia
 * 
 */
function favEmpty (){
    if (localStorage.getItem("gifosFav") == "[]"){
        empty.classList.remove('displayNone');
        //divFav.innerHTML =""
    } else if (localStorage.getItem("gifosFav") == null) {
        empty.classList.remove('displayNone');
    } else {
        empty.classList.add('displayNone')

    }
}        
/**
 * @description muestra más favoritos al hacer click en Ver Mas
 */
function seeMoreFav (){
    const i = favoritesLS()
    if(favLimit> 36){
        favLimit = 36
    } else {
        favLimit += 12
    }
    //dibujo Favoritos
    drawFav(favoritesLS())
    console.log("limitFav " + favLimit)
}


//funciones
//TODO se puede simplificar y unificar
favoritesLS()
drawFav(favoritesLS())
favEmpty()
drawTrendingFav()
//paginador
rBtn.addEventListener('click', () => { trendPagR(drawTrendingFav)} );
lBtn.addEventListener('click', () => { trendPagL(drawTrendingFav)} );
seeMoreButton.addEventListener('click', seeMoreFav)
//closeMax.addEventListener('click', () =>{gifoMax.style.display = "none"})
