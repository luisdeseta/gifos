import { getTrending } from './getapi.js';
import {markUpSearchResults,} from './search.js';
import { drawFav, setFavGifs } from './fav.js';


/**
 * @description Dibuaja trending en index y agregar comportamiento a los botones
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar para paginacion
 */
 export async function drawTrending(limit=3, offset=0) {
  const divTrend = document.querySelector('#trendGifos-Container')
  const trendArr =[];
  getTrending(limit=3, offset)
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
              fav.addEventListener('click', ()=> setFavGifs(trendArr[t].id));
            }
        })
}

/**
 * @description Dibuaja trending en fav.html y agregar comportamiento a los botones
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar para paginacion
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
                    setFavGifs(trendArr[t].id);
                   //drawFav()
                });
              }
          })
  }

/**
 * @description Paginador. cambiar el offset y suma 3
 */
const rBtn = document.getElementById('rigthbtn')
let offSet = 0
export const trendPagR =() =>{
    offSet += 3;
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
     offSet -= 3;
     let limit=3
     console.log(offSet)
     drawTrending(limit, offSet)
     
 }
 lBtn.addEventListener('click', trendPagL)