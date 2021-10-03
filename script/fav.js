import {favoritesLS, trendPagL,trendPagR,setFavGifs,getTrending, markUpSearchResults, getGifosByIDs, download,gifoMaxBtn} from "./getapi.js";

//constantes
const rBtn = document.getElementById('rigthbtn')
const lBtn = document.getElementById('leftbtn')
const gifoMax = document.getElementById('gifoMax');
const empty = document.querySelector('#favEmpty');


/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 */
const drawFav = ()=>{
    const divFav = document.querySelector('#favResault-gif');
    let fav ='';
    let dataHeart =[];
    let savedFav = favoritesLS();
    console.log("savedFav =>",savedFav.length)
    if ( savedFav.length === 0 ) {
        divFav.innerHTML =""
    } else {
        getGifosByIDs(savedFav)
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
                    //guardo en favoritos
                    favy.addEventListener('click', ()=> {
                        setFavGifs(dataHeart[t].id);
                        drawFav();
                        favEmpty();
                    })
                    //download de un gifo
                    down.addEventListener('click', function (){
                        download(dataHeart[t].images.original.url, `Gifo ${dataHeart[t].title}`)
                        console.log("ejecutando download...")
                    })
                    
                    
                }
            })
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
                searchfav.addEventListener('click', function() {
                    setFavGifs(trendArr[t].id);
                    drawFav();
                    favEmpty();
                });
                down.addEventListener('click', function (){
                    download(trendArr[t].images.original.url, `Gifo ${trendArr[t].title}`)
                })
                max.addEventListener('click', function(){
                    //agrego la clase para mostrar el modal
                    gifoMax.style.display ="flex"
                    //dibuja el html
                    gifoMax.innerHTML = gifoMaxBtn(trendArr[t].images.fixed_height.url, trendArr[t].username, trendArr[t].title);
                    //quito la clase para cerrar el modal
                    const closeMax = document.getElementById('closeMax');
                    closeMax.addEventListener('click', () =>{gifoMax.style.display = "none"})
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
        empty.classList.remove('displayNone')
    } else {
        empty.classList.add('displayNone')
    }
}        

drawFav()
favEmpty()
drawTrendingFav()
//paginador
rBtn.addEventListener('click', () => { trendPagR(drawTrendingFav)} );
lBtn.addEventListener('click', () => { trendPagL(drawTrendingFav)} );
