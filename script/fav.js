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
    let favArr = []
    getGifosByIDs(ids)
    .then( (res) => {
    const {data} = res;
    let fav =''
    for (let x = 0; x < data.length; x++) {
        favArr.push(data[x]);
    }
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
    .then(() => {
        //const {data} = res;
        for (let t = 0; t < favArr.length; t++){
            let fav = document.getElementById(`heart-${favArr[t].id}`);
            fav.addEventListener('click', ()=> setFavGifs(favArr[t].id));
        }
    })
}