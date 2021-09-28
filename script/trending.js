import { getTrending, download,gifoMaxBtn } from './getapi.js';
import {markUpSearchResults} from './main.js';
import { setFavGifs } from './fav.js';


/**
 * @description Dibuja trending en index y agregar comportamiento a los botones
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar para paginacion
 * TODO divir la función en tres:
 * 1- trae el endpoint y retorna un trend = []
 * 2- dibujar el HTML con stringify el trend []
 * 3- agregar el comportamiento a los botones
 */
 export async function drawTrending(limit=3, offset=0) {
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
                gifoMax.innerHTML = gifoMaxBtn(trendArr[t].images.fixed_height.url, trendArr[t].username, trendArr[t].title);
                //quito la clase para cerrar el modal
                const closeMax = document.getElementById('closeMax');
                closeMax.addEventListener('click', () =>{gifoMax.style.display = "none"})
              })
            }
        })
}

/**
 * @description Dibuaja trending en fav.html y agregar comportamiento a los botones
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar para paginacion
 * TODO mover a fav.js
 */
 export async function drawTrendingFav() {
    const divTrend = document.querySelector('#trendGifos-Container')
    const trendArr =[];
    getTrending()
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
                let fav = document.getElementById(`heart-${trendArr[t].id}`);
                fav.addEventListener('click', function() {    
                    setFavGifs(`gif-${trendArr[t].id}`,trendArr[t].id);
                    drawFav()
                });
                let down = document.getElementById(`down-${trendArr[t].id}`);
                down.addEventListener('click', () => download(trendArr[t].images.original.url,`Gifo ${trendArr[t].title}`))    
              }
          })
  }


/**
 * @description Paginador. cambia el offset y suma 3
 */
const rBtn = document.getElementById('rigthbtn')
let offSet = 0
export const trendPagR =() =>{
    if (offSet === 50) {
        offSet = 50
    } else {

        offSet += 3;
    }
    let limit=3
    console.log(offSet)
    drawTrending(limit, offSet)
    
}
rBtn.addEventListener('click', trendPagR)

/**
 * @description Paginador. cambiar el offset y resta 3
 */
 const lBtn = document.getElementById('leftbtn')
  export const trendPagL =() =>{
    if (offSet <= 0) {
        offSet = 0
    } else {
        offSet -= 3;

    }
     let limit=3
     console.log(offSet)
     drawTrending(limit, offSet)
     
 }
 lBtn.addEventListener('click', trendPagL)