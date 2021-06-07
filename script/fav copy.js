import {getGifosByIDs} from './getapi.js';
import {markUpSearchResults} from './search.js'
import {drawTrending} from './trending.js'
// search y trending van a poner un listener
drawTrending()
/**
 * @description Guardar Gif en LocalStorage
 * falta cambiar iconos
 */
//JSON.parse(localStorage.getItem('FavGifos'))
export const gifFavArr = JSON.parse(localStorage.getItem('FavGifos'));
 export const setFavGifs = (id) =>{
     //buscar en el LS y pasarlo a JSON
     if (gifFavArr.includes(id)) { //verifica si ID esa en el Array
         let i = gifFavArr.indexOf(id)
         gifFavArr.splice(i, 1)         //si esta lo quita
     } else{
         gifFavArr.splice(0, 0,id);      //si no esta lo agrega
     }
     console.log(gifFavArr)
     console.log(id)
     
     localStorage.setItem('FavGifos', JSON.stringify(gifFavArr))
    drawFav(gifFavArr)      //dibuba los Gif del local storage
     
 }
 

/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
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
        for (let t = 0; t < favArr.length; t++)
        {
        let fav = document.getElementById(`heart-${favArr[t].id}`);
            fav.addEventListener('click', ()=> 
            {
                setFavGifs(favArr[t].id);
                
            })
        }
    })
}

const test = (gifo) =>{
    console.log(gifo)
  }