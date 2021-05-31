import { getTrending } from './getapi.js';
import {markUpSearchResults, addListenerFav} from './search.js'

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
        let trendArr =[];
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
      for (let t = 0; t < trendArr.length; t++){
        let fav = document.getElementById(`#heart-${trendArr[t].id}`);
        let test = () =>{
          alert("prueba")
        }
        fav.forEach((element) => {
        element.addEventListener('click', test);
        });

      }  
        divTrend.innerHTML = trend;
      
    })
    .catch(err => console.warn('Error en la petición trending',err))
  }