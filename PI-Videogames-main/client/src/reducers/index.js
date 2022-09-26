import { GET_ALL_VIDEOGAMES, GET_ALL_GENRES,
        GET_PLATFORMS,GET_GAME_BY_NAME,
        FILTER_BY_CREATION, FILTER_BY_GENRES,
        ORDER_BY_NAME, ORDER_BY_RATING,
        POST_GAME,GET_VIDEOGAME_BY_ID} from "../actions/action";

const initialState={
    games:[],
    genres:[],
    platforms:[],
    allGamesForFilter:[],
    detail:[]
}

export default function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                games: action.payload,
                allGamesForFilter: action.payload
            }
        case GET_ALL_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case GET_VIDEOGAME_BY_ID:
            return{
                ...state,
                detail: action.payload
            }
        case FILTER_BY_CREATION:
            const allGames = state.allGamesForFilter

            let statusFilter = action.payload === 'db' ? allGames.filter(e => e.id.toString().length > 10) : 
            allGames.filter(e => e.id.toString().length < 10)
            return {
                ...state,
                games: action.payload === 'all' ? allGames : statusFilter
            }

        case FILTER_BY_GENRES:
            const allGamesGenres = state.allGamesForFilter
                        
            let statusFilterGenres = action.payload === 'all' ? allGamesGenres :
            allGamesGenres.filter(e => e.genres.find(g=>g.name === action.payload))
            return{
                ...state,
                games: statusFilterGenres
            }
        case ORDER_BY_NAME:
            let orderGamesByName = action.payload === 'az' ?
                state.games.sort(function(a,b){
                    if (a.name > b.name) return 1
                    else if(a.name < b.name) return -1
                    return 0
                }) :
                state.games.sort(function(a,b){
                    if (a.name > b.name) return -1
                    else if(a.name < b.name) return 1
                    return 0
                })
            return{
                ...state,
                games: orderGamesByName
            }
        case ORDER_BY_RATING:
            let orderGamesByRating = action.payload === 'min' ?
                state.games.sort(function(a,b){
                    if (a.rating > b.rating) return 1
                    else if(a.rating < b.rating) return -1
                    return 0
                }) :
                state.games.sort(function(a,b){
                    if (a.rating > b.rating) return -1
                    else if(a.rating < b.rating) return 1
                    return 0
                })
            return{
                ...state,
                games: orderGamesByRating
            }
        case GET_GAME_BY_NAME:
            return {
                ...state,
                games:action.payload
            }
        case POST_GAME:
            return {
                ...state,
            }
        default:return {...state}
    }

}