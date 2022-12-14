import axios from 'axios';
import {URL_GET_VIDEOGAME_BY_ID, URL_GET_VIDEOGAMES,
        URL_GET_GENRES, URL_GET_PLATFORMS,
        URL_GET_VIDEOGAME_BY_NAME,URL_POST_VIDEOGAME
    } from '../assets/constant'

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
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const UPDATE_PAGE = 'UPDATE_PAGE'

export function clearDetail(){
    return {type:CLEAR_DETAIL,
    payload:{}
    }
}

export function getVideogameById(idParams){
    return async function(dispatch){
        let {data} = await axios.get(`${URL_GET_VIDEOGAME_BY_ID}/${idParams}`)
        return dispatch({
            type:GET_VIDEOGAME_BY_ID,
            payload: data
        })
    }
}

export function getVideogames(){
    return async function(dispatch){
        let {data} = await axios.get(URL_GET_VIDEOGAMES);
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data
        })
    }
}

export function getGenres(){
    return async function (dispatch){
        let {data} = await axios.get(URL_GET_GENRES)
        return dispatch({
            type: GET_ALL_GENRES,
            payload : data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        //const {data} = await axios.get('http://localhost:3001/games/platforms') 
        const {data} = await axios.get(URL_GET_PLATFORMS)
        return dispatch({
            type: GET_PLATFORMS,
            payload:data
        })
    }
}
export function getVideogamesByName(name){
    return async function (dispatch){
        try {
            let {data} = await axios.get(URL_GET_VIDEOGAME_BY_NAME+name)
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
        let {data}= await axios.post(`${URL_POST_VIDEOGAME}/`,payload)
        console.log(data)
        return data
    }
}
export function updatePage(payload){
    return{
        type: UPDATE_PAGE,
        payload
    }
}