import { GET_ALL_VIDEOGAMES } from "../actions/action";

const initialState={
    games:[]
}

export default function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
        return {
            ...state,
            games:action.payload
        }
        default:return {...state}
    }

}