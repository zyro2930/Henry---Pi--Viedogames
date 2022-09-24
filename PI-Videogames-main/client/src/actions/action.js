import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';

export function getVideogames(){
    return async function(dispatch){
        var resp = await axios.get('http://localhost:3001/',{});
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: resp.data
        })
    }
}