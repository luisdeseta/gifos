import {getGifosByIDs} from './getapi.js';
import {markUpSearchResults} from './search.js';
import {drawTrendingFav} from './trending.js';
// search y trending van a poner un listener
drawTrendingFav()
/**
 * @description Guardar Gif en LocalStorage
 * falta cambiar iconos
 */

export const setFavGifs = (id) =>{
    //buscar en el LS y pasarlo a JSON
    const gifFavArr = localStorage.getItem('FavGifos');
    console.log("inicio gifFavArr", gifFavArr)
     if (gifFavArr.includes(id)) { //verifica si ID esta en el Array
         let i = gifFavArr.indexOf(id)
         gifFavArr.splice(i, 1)         //si esta lo quita
     } else{
         gifFavArr.splice(0, 0,id);      //si no esta lo agrega
     }
     //console.log("FIN gifFavArr", gifFavArr)
     localStorage.setItem('FavGifos', JSON.stringify(gifFavArr))
 }

 
/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 */
export const drawFav = ()=>{
    const divFav = document.querySelector('#favResault-gif');
    const favLS = localStorage.getItem('FavGifos')
    const fav =''
    //console.log("favLS localStorage", favLS)
    if (favLS.length === 0 ) {
        //console.log("if esta vacio")
        divFav.innerHTML =""
    } else {
            let favArr = []
            getGifosByIDs(favLS)
            .then( (res) => {
            const {data} = res;
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
                        drawFav()
                    })
                }
            })

    }
}

const load =() => {
    document.getElementById('favContainer').addEventListener("DOMContentLoaded", drawFav())
}
//drawFav()