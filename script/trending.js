import { getTrending } from './getapi.js';
import {markUpSearchResults,} from './search.js';
import { setFavGifs } from './fav.js';

//importar funcion de guardar en local storage


/**
 * @description Dibuaj trending y agregar comportamiento a los botones
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar par paginacion
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
* @description endpoint de Trending, con fetch
* @search
*/
export const getTrendingFetch = (limitTrend=3, offSetTrend=0) =>{
  return new Promise ((resolve, reject) => {
      fetch(`${TRENDING}?api_key=${APIKEY}&limit=${limitTrend}&offset=${offSetTrend}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}