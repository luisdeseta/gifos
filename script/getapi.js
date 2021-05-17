import { APIKEY, SEARCH } from './variables.js';

/**
 * @description obtener json del endpoint search
 * @search parametro a buscar
 * @limit cantidad de resultados a mostrar
 * @offset orden dentro del json
 */
export const getSearchEndP = (search,limit,offset) =>{
    return new Promise((resolve, reject) =>{
        fetch(`${SEARCH}?api_key=${APIKEY}&q=${search}&limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
}