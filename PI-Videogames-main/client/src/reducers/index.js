import { GET_ALL_VIDEOGAMES, GET_ALL_GENRES,
        GET_PLATFORMS,GET_GAME_BY_NAME,
        FILTER_BY_CREATION, FILTER_BY_GENRES,
        ORDER_BY_NAME, ORDER_BY_RATING,
        POST_GAME,GET_VIDEOGAME_BY_ID,
        CLEAR_DETAIL,UPDATE_PAGE} from "../actions/action";

const initialState={
    games:[],
    genres:[],
    platforms:[],
    allGamesForFilter:[],
    detail:[],
    page:1
}

export default function rootReducer (state = initialState, action){
    switch(action.type){
        case UPDATE_PAGE:
            return{
                ...state,
                page: action.payload
            }
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
        case GET_GAME_BY_NAME:
            return {
                ...state,
                games:action.payload
            }
        case FILTER_BY_CREATION:
            //const allGames = state.allGamesForFilter
            state.games=state.allGamesForFilter.slice()
            const allGamesCreation = state.games

            let statusFilter = action.payload === 'db' ? allGamesCreation.filter(e => e.id.toString().length > 10) : 
            allGamesCreation.filter(e => e.id.toString().length < 10)
            return {
                ...state,
                games: action.payload === 'all' ? state.games : statusFilter
            }

        case FILTER_BY_GENRES:
            //const allGamesGenres = state.allGamesForFilter
            state.games=state.allGamesForFilter.slice()
            const allGamesGenres = state.games
                        
            let statusFilterGenres = action.payload === 'all' ? state.allGamesForFilter :
            allGamesGenres.filter(e => e.genres.find(g=>g.name === action.payload))
            let arraySet = new Set (statusFilterGenres)
            let result=[...arraySet]
            //allGamesGenres.filter(e => e.genres.includes(action.payload))
            return{
                ...state,
                games: result//statusFilterGenres
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
                games: action.payload==='all'? state.games : orderGamesByName
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
                games:  action.payload==='all'? state.games : orderGamesByRating
            }
        case POST_GAME:
            return {
                ...state,
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                detail:action.payload
            }
        default:return {...state}
    }

}