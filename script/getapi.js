import { APIKEY, AUTOCOMPLETE, SEARCH } from './variables.js';

/**
 * @description obtener json del endpoint search
 * @search parametro a buscar (obligatorio)
 * @limit cantidad de resultados a mostrar
 * @offset orden dentro del json
 */
export const getSearchEndP = (search,limit,offset=5) =>{
    return new Promise((resolve, reject) =>{
        fetch(`${SEARCH}?api_key=${APIKEY}&q=${search}&limit=${limit}&offset=${offset}`)
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