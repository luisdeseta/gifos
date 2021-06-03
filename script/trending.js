import { getTrending } from './getapi.js';
import {markUpSearchResults,} from './search.js'

const divTrend = document.querySelector('#trendGifos-Container')
/**
 * @description endpoint de Trending. Usa el markup del Search
 * @param {*} limit Revisar para paginancion
 * @param {*} offset revisar par paginacion
 */
export const TrendingGif = (limit, offset=0) =>{
    getTrending(limit, offset)
    .then((res) => {
        const {data} = res;
        let trend ='';
        const trendArr =[];
        console.log('Trending Gif', res)
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
      /* setTimeout(() => { // el machetazo ;)
        
      }, 2000); */
    })
    .then((res) =>{
      const {data} = res;
      for (let t = 0; t < data.length; t++){
      let fav = document.getElementById(`heart-${data[t].id}`);
      fav.addEventListener('click', ()=> test(data[t].name));
      }  
      

    })
    .catch(err => console.warn('Error en la petición trending',err))
  }
  
const test = (gifo) =>{
    console.log(gifo)
  }