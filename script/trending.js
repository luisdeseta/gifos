import { getTrending } from './getapi.js';
import {markUpSearchResults,} from './search.js';
import { drawFav, setFavGifs } from './fav.js';


/**
 * @description Dibuaja trending en index y agregar comportamiento a los botones
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar para paginacion
 */
 export async function drawTrending() {
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
              fav.addEventListener('click', ()=> setFavGifs(trendArr[t].id));
            }
        })
}
const test = (gifo) =>{
  console.log(gifo)
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
                    drawFav()
                });
              }
          })
  }