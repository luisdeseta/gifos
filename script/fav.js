import {getGifosByIDs, download} from './getapi.js';
import {markUpSearchResults} from './search.js';
import {drawTrendingFav} from './trending.js';

//boton crear Gifo
// const c= document.querySelector('#createButtom-img')
// c.addEventListener('click', window.location = './create.html')

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
    //drawFav() 
}


/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 * 
 */
export const drawFav = ()=>{
    const divFav = document.querySelector('#favResault-gif');
    let fav =''
    let dataHeart =[]
    if ( localStorage.length === 0 ) {
        divFav.innerHTML =""
    } else {
        let favArr = []
        for (let i = 0; i < localStorage.length; i++) {
            const element = localStorage.getItem(localStorage.key(i));
            favArr.push(element);
        }
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
                dataHeart.push(data[f]);
                }
                divFav.innerHTML = fav;
            })
        .then(() => {
            for (let t = 0; t < dataHeart.length; t++){
                let favy = document.getElementById(`heart-${dataHeart[t].id}`);
                favy.addEventListener('click', ()=> {
                    setFavGifs(`gif-${dataHeart[t].id}`,dataHeart[t].id);
                    drawFav();
                    //download(dataHeart[t].images.original.url,dataHeart[t].title)
                })
            }
        })
        }
    }
//document.getElementById('favContainer').addEventListener("load", console.log("load"));
//window.onload = () => {console.log("onload")}


//drawFav()
drawTrendingFav()