import { getTrending } from './getapi.js';

export const TrendingGif = (limit, offset) =>{
    getTrending(limit, offset)
    .then((res) => {
        const {data} = res;
        console.log('Trending Gif', res)
    })
    .catch(err => console.warn('Error en la petición trending',err))
}