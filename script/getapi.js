import { APIKEY, AUTOCOMPLETE, SEARCH, CATEGORIE,TRENDING } from './variables.js';
import { markUpSearchResults } from './search.js';
/**
 * @description obtener json del endpoint search
 * @search parametro a buscar (obligatorio)
 * @limit cantidad de resultados a mostrar
 * @offset orden dentro del json
 */
export const getSearchEndP = (search,limit,offset=5) =>{
    return new Promise((resolve, reject) =>{
        fetch(`${SEARCH}?api_key=${APIKEY}&q=${search}&limit=${limit}&offset=${offset}&lang=es`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
}

/**
* @description autocompletar el campo de busqueda
* @search parametro a buscar (obligatorio)
*/

export const autoComplete = (search) =>{
    return new Promise ((resolve, reject)=>{
        fetch(`${AUTOCOMPLETE}?api_key=${APIKEY}&q=${search}&limit=4`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}
/**
* @description endpoint de categorias
* @search
*/
export const getCategorie = () => {
    return new Promise ((resolve, reject) => {
        fetch(`${CATEGORIE}?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

/**
* @description endpoint de Trending
* @search
*/
export const getTrending = (limitTrend=3, offSetTrend=0) =>{
    return new Promise ((resolve, reject) => {
        fetch(`${TRENDING}?api_key=${APIKEY}&limit=${limitTrend}&offset=${offSetTrend}`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

const divTrend = document.querySelector('#trendGifos-Container')
/**
* @description endpoint de Trending con otro then
* @search
*/
export async function getTrending2(limitTrend=3, offSetTrend=0) {
    const trendy = await fetch(`${TRENDING}?api_key=${APIKEY}&limit=${limitTrend}&offset=${offSetTrend}`);
    const res = await trendy.json();
    return res
}


export async function getTrending3() {
    const trendArr =[];
    getTrending2()
    .then((res) => {
    const {data} = res;    
    let trend ='';
    //const trendArr =[];
    console.log('Trending Gif', data);
    console.log('Trending Gif', trend);
    console.log('Trending Gif', trendArr);
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
    //const {data} = res;
    for (let t = 0; t < trendArr.length; t++){
    let fav = document.getElementById(`heart-${trendArr[t].id}`);
    fav.addEventListener('click', ()=> test(trendArr[t].id));
    }

    })

}
const test = (gifo) =>{
    console.log(gifo)
  }

/* export async function getTrending3() {
    getTrending2()
    .then((res) => {
    const {data} = res;    
    let trend ='';
    const trendArr =[];
    console.log('Trending Gif', data);
    console.log('Trending Gif', trend);
    console.log('Trending Gif', trendArr);
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
    .then((res) => {
    const {data} = res;
    
    for (let t = 0; t < trendArr.length; t++){
    let fav = document.getElementById(`heart-${trendArr[t].id}`);
    fav.addEventListener('click', ()=> test(trendArr[t].name));
    }

    })

} */