import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const POST_GAME = 'POST_GAME'
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID'

export function getVideogameById(idParams){
    return async function(dispatch){
        let {data} = await axios.get(`http://localhost:3001/${idParams}`)
        return dispatch({
            type:GET_VIDEOGAME_BY_ID,
            payload: data
        })
    }
}

export function getVideogames(){
    return async function(dispatch){
        let {data} = await axios.get('http://localhost:3001/all');
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data
        })
    }
}

export function getGenres(){
    return async function (dispatch){
        let {data} = await axios.get('http://localhost:3001/games/genres');
        return dispatch({
            type: GET_ALL_GENRES,
            payload : data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        const {data} = await axios.get('http://localhost:3001/games/platforms') 
        return dispatch({
            type: GET_PLATFORMS,
            payload:data
        })
    }
}
export function getVideogamesByName(name){
    return async function (dispatch){
        try {
            let {data} = await axios.get(`http://localhost:3001/gamesByName?name=${name}`)
            return dispatch({
                type:GET_GAME_BY_NAME,
                payload : data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export function filterGameByCreation (payload){
    return {        
        type: FILTER_BY_CREATION,
        payload
    }
}
export function filterByGenres (payload){
    return{
        type: FILTER_BY_GENRES,
        payload
    }
}

export function orderByName (payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
export function orderByRating (payload){
    return{
        type: ORDER_BY_RATING,
        payload
    }
}
export function postVideogame (payload){
    return async function(dispatch){
        let {data}= await axios.post('http://localhost:3001/',payload)
        console.log(data)
        return data
    }
}