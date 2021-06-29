import {getGifosByIDs} from './getapi.js';
import {markUpSearchResults} from './search.js';
import {drawTrendingFav} from './trending.js';

drawTrendingFav()
/**
 * @description Guardar Gif en LocalStorage
 * @param name clave del Gifo
 * @param id id del gifo
 *  
 */
//falta cambiar iconos
export const setFavGifs = (name, id) =>{
    if (name in localStorage) {
        localStorage.removeItem(name)        
    } else{
        localStorage.setItem(name,id) 
    }
drawFav() 
}

 
/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 */
export const drawFav = ()=>{
    const divFav = document.querySelector('#favResault-gif');
    //const favLS = localStorage.getItem('FavGifos')
    let fav =''
    //console.log("favLS localStorage", favLS)
    if ( localStorage.length === 0 ) {
        //console.log("if esta vacio")
        divFav.innerHTML =""
    } else {
            let favArr = []
            for (let i = 0; i < localStorage.length; i++) {
                const element = localStorage.getItem(localStorage.key(i));
                favArr.push(element);
            }
            console.log("favArr= ", favArr)
            getGifosByIDs(favArr)
            .then( (res) => {
            const {data} = res;
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
                for (let t = 0; t < favArr.length; t++){
                let favy = document.getElementById(`heart-${favArr[t]}`);
                    favy.addEventListener('click', ()=> {
                        setFavGifs(`gif-${favArr[t]}`,favArr[t]);
                        drawFav()
                        
                    })
                let down = document.getElementById(`down-${favArr[t]}`);
                down.addEventListener('click', download(favArr[t],favArr[t])
                )}
            })

    }
}

const load =() => {
    document.getElementById('favContainer').addEventListener("DOMContentLoaded", drawFav())
}
drawFav()
/**
 * @description Descarga un Gifo
 * @param id id del Gifo a descargar
 */
export const download = (id,title) => {
    
    console.log("urlGifo= ", id, title);
    

}
