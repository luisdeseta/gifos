import {getGifosByIDs} from './getapi.js';
import {markUpSearchResults} from './search.js'
import {drawTrending} from './trending.js'
// search y trending van a poner un listener
drawTrending()
/**
 * @description Guardar Gif en LocalStorage
 * cambiar iconos
 */
const gifFavArr = [];
export const setFavGifs = (id) =>{
    if (gifFavArr.includes(id)) {
        let i = gifFavArr.indexOf(id)
        gifFavArr.splice(i, 1)        
    } else{
        gifFavArr.splice(0, 0,id);
    }
    console.log(gifFavArr)
    console.log(id)
    
    localStorage.setItem('FavGifos', JSON.stringify(gifFavArr))
    drawFav(gifFavArr)
}

/**
 * @description leer LocalStorage y dibujarlo en fav.html
 */

export const drawFav = (ids)=>{
    const divFav = document.querySelector('#favResault-gif');
    getGifosByIDs(ids)
    .then( (res) => {
    const {data} = res;
    let fav =''
    for (let f = 0; f < data.length; f++) {
        fav += markUpSearchResults(
            data[f].images.downsized_medium.url,
            data[f].title,
            data[f].username,
            data[f].title,
            data[f].id);
    }
    divFav.innerHTML = fav;
    })


}