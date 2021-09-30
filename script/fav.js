import {getGifosByIDs, download} from "./getapi.js";
import {markUpSearchResults} from "./main.js";
//import {drawTrendingFav} from './trending';

console.log("== fav.js ===")

//boton crear Gifo
// const c= document.querySelector('#createButtom-img')
// c.addEventListener('click', window.location = './create.html')

/**
 * @description Guardar Gif en LocalStorage en formato string
 * @param id id del gifo
 * 
 */

export const setFavGifs = (id) =>{
    let fav = favoritesLS();
    let i = fav.indexOf(id)
    console.log("fav " + fav)
    if (i != -1) {
        fav.splice(i,1)
    } else {
        fav.push(id)
        
    }
    let favLS = JSON.stringify(fav);
    localStorage.setItem('gifosFav', favLS);
    console.log("fav ===> " + favLS);
}


/**
 * 
 * @description Recupera los datos de Local Storage y lo retorna como un objeto (parse)
 * si el localstorage está vacio retorna un array vacio
 * TODO ¿que pasa si hay otra cosa en el LS?
 */
const favoritesLS = () =>{
    if (localStorage.length === 0){
        return []
    } else {
        return JSON.parse(localStorage.getItem('gifosFav'))
    }
}

//console.log("fav.js favoritesLS => " + favoritesLS())

/**
 * @description leer LocalStorage y dibujarlo en fav.html
 * @function getGifosByIDs endpoint para traer gifos por array
 * recibe ids de gifos separados por coma
 * TODO revisar el nuevo setFavGifs y favoritesLS
 */
const drawFav = ()=>{
    //TODO reemplazar localstorage por la función favoritesLS
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
        //Agrega comportamiento a los favoritos insertados
        //TODO revisar como ejecutar drawFav nuevamente
        .then(() => {
            for (let t = 0; t < dataHeart.length; t++){
                let favy = document.getElementById(`heart-${dataHeart[t].id}`);
                favy.addEventListener('click', ()=> {
                    setFavGifs(dataHeart[t].id);
                    drawFav();
                    //download(dataHeart[t].images.original.url,dataHeart[t].title)
                })
            }
        })
        }
    }


//Dibujar los favoritos cuando carga la pagina
//TODO usar async await??
//document.getElementById('favContainer').addEventListener("load", console.log("load"));
//window.onload = () => {console.log("onload")}


//drawFav()
//drawTrendingFav()