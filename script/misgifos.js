import {setMyGifosLS, myGifosLS,getGifosByIDs, drawTrending, trendPagR,trendPagL,markUpMyGifos,gifoMaxBtn, download  }  from "./getapi.js";

//constantes
const seeMoreButton = document.querySelector('#seeMoreButton');
const empty = document.querySelector('#favEmpty');

//Paginador de trending
const rBtn = document.getElementById('rigthbtn')
const lBtn = document.getElementById('leftbtn')


//Limite del boton Ver más en favoritos
let favLimit = 12

/**
 * @description leer LocalStorage y dibujarlo en misGifos
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 * Misma estrucutra que drawFav()
 */
const drawMyGifos = ()=>{
    const divFav = document.querySelector('#favResault-gif');
    let fav ='';
    let dataHeart =[];
    let savedFav = myGifosLS(); 
    let drawed = savedFav.slice(0,favLimit).length
    console.log("savedGifos => ",savedFav.length)
    console.log("drawed => " + drawed)
    if ( savedFav.length === 0 ) return divFav.innerHTML =""  
    //.reverse para mostar primero el ultimo Fav marcado
    getGifosByIDs(savedFav.slice(0,favLimit))
    .then( (res) => {
        const {data} = res;
        for (let f = 0; f < data.length; f++) {
            fav += markUpMyGifos(
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
                let favy = document.getElementById(`delete-${dataHeart[t].id}`);
                let down = document.getElementById(`down-${dataHeart[t].id}`);
                let max = document.getElementById(`max-${dataHeart[t].id}`);
                //guardo en favoritos
                favy.addEventListener('click', ()=> {
                    setMyGifosLS(dataHeart[t].id);
                    drawMyGifos();
                    myGifosEmpty();
                })
                //download de un gifo
                down.addEventListener('click', function (){
                    download(dataHeart[t].images.original.url, `Gifo ${dataHeart[t].title}`)
                    console.log("ejecutando download...")
                })
                //maximizar un gifo
                max.addEventListener('click', function(){
                    //agrego la clase para mostrar el modal
                    gifoMax.style.display ="flex"
                    //dibuja el html
                    gifoMax.innerHTML = gifoMaxBtn(dataHeart[t].images.fixed_height.url, dataHeart[t].username, dataHeart[t].title);
                    //quito la clase para cerrar el modal
                    const closeMax = document.getElementById('closeMax');
                    closeMax.addEventListener('click', () =>{gifoMax.style.display = "none"})
                })
                
            }
        })
        //compruebo la cantidad de gifos en dibujados y en favoritos para 
        // ocultar el boton Ver mas
        if (drawed == savedFav.length) {
            seeMoreButton.classList.add('displayNone')
        } else if (savedFav.length > 12 ){
            seeMoreButton.classList.remove('displayNone')
        } else if (savedFav.length < 12){
            seeMoreButton.classList.add('displayNone')
        }
        
    }

function seeMoreGifos (){
    const i = myGifosLS()
    if(favLimit> 36){
        favLimit = 36
    } else {
        favLimit += 12
    }
    //dibujo Mis Gifos
    drawMyGifos()
    console.log("limitFav " + favLimit)
}
/**
 * @description Si no hay gifos creados muestra pagina vacia
 * 
 */
 function myGifosEmpty (){
    if (localStorage.getItem("myGif") == "[]"){
        empty.classList.remove('displayNone');
        //divFav.innerHTML =""
    } else if (localStorage.getItem("myGif") == null) {
        empty.classList.remove('displayNone');
    } else {
        empty.classList.add('displayNone')

    }
}
drawMyGifos();
drawTrending();
myGifosEmpty ();

//Paginador
rBtn.addEventListener('click', () => { trendPagR(drawTrending) } );
lBtn.addEventListener('click', () => { trendPagL(drawTrending) });
seeMoreButton.addEventListener('click', seeMoreGifos)