import { APIKEY, AUTOCOMPLETE, SEARCH, CATEGORIE,TRENDING,GIFSBYID } from './variables.js';
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
 * @param offSetTrend=0
 * @param limitTrend=3
 */
export async function getTrending(limitTrend=3, offSetTrend=0) {
    const trendy = await fetch(`${TRENDING}?api_key=${APIKEY}&limit=${limitTrend}&offset=${offSetTrend}`);
    const res = await trendy.json();
    return res
}

/**
 * @description endpoint de GIFs by id
 * @param ids a consultar
 * 
 */
 export async function getGifosByIDs(ids) {
    const gifs = await fetch(`${GIFSBYID}?api_key=${APIKEY}&ids=${ids}`);
    const res = await gifs.json();
    return res
}