import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideogames, getGenres,filterGameByCreation,
         filterByGenres, orderByName, orderByRating } from "../../actions/action";
import { Link } from "react-router-dom";
import Videogame from "../Videogame";
import style from'./style.module.css'
import Paginado from "../Paginado";
import SearchBar from '../SearchBar';
import imagenRog from '../../recursos/img/AsusRogXXL.jpg'

export default function Home (){

    //useSelector es lo mismo que hacer el mapStateToProps, 
    //es mas facil porque me declaro una constante y me traigo en esa constante 
    //todo lo que esta en el estado de games
    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.games)//traigo del reducer el stado games
    const allGenres = useSelector((state) => state.genres)
    const [orden, setOrden] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage// 1*15=15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage//15-15=0
    const currentGames = allGames.slice(indexOfFirstGame,indexOfLastGame)
    //Guardame en un estado local la pagina actual y una constante que me setee la pagina actual
    //Arranca en 1 porque siempre voy a arrancar por la primer pagina, mi useState inicial va a ser 1
    //En otra constatnte guardame cuantos videojuegos quiero yo por pagina.
    //Es decir cuantos componentes card quiero que muestre

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch])

    function handleClickHome(e){
        e.preventDefault()
        dispatch(getVideogames());        
    }

    function handleFilterCreated(e){
        dispatch(filterGameByCreation(e.target.value))
    }

    function handleFilterGenres(e){
        dispatch(filterByGenres(e.target.value))
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleOrderByRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    let contador =0
    return(
        <div >
            <button onClick={ e=> {handleClickHome(e)}}>Home</button>
            <Link to ='/create'><button>Nuevo</button></Link>            
            <div>
                <div>
                    <SearchBar></SearchBar>
                </div>
                <div>
                    <label>Generos</label>
                    <select onChange={e=>handleFilterGenres(e)}>
                    <option key = '0' value = 'all'>Todos</option>
                        {allGenres?.map(g => {
                            return (<option key ={g.id} value = {g.name}> {g.name} </option>)
                        })}
                    </select>
                </div>
                <div>
                    <label>Creados</label>
                    <select onChange = {e => handleFilterCreated(e)}>
                        <option key = '0' value = 'all'>Todos</option>
                        <option key = '1' value = 'db'>Juegos creados</option>
                        <option key = '2' value = 'api'>Api</option>
                    </select>
                </div>
                <div>
                    <label>Rating</label>
                    <select onChange = {e => handleOrderByRating(e)}>
                        <option key = '0' value = 'max'>Rating alto</option>
                        <option key = '1' value = 'min'>Rating bajo</option>
                    </select>
                </div>
                <div>
                    <label>Alfabeticamente</label>
                    <select onChange = {e=> handleOrderByName(e)}>                    
                        <option key = '0' value = 'az'>A/Z</option>
                        <option key = '1' value = 'za'>Z/A</option>
                    </select>
                </div>
                <Paginado key= {contador++}
                gamesPerPage = {gamesPerPage} 
                allGames = {allGames.length} 
                paginado = {paginado}
                />
                <div className={style.cards}>
                    {currentGames?.map(el => {
                        return(
                            <div key = {el.id} className={style.card}>
                                {/* <Link key = {el.id} to={'/details'} > */}
                                <Link to ={`/${el.id}`} key = {el.id}>
                                <Videogame key = {el.id}  
                                    name = {el.name} 
                                    image = {el.background_image? el.background_image :imagenRog}
                                    genres = {el.genres}/>
                                </Link>
                            </div>
                        )                       
                    })}
                </div>
                <Paginado 
                gamesPerPage = {gamesPerPage} 
                allGames = {allGames.length} 
                paginado = {paginado}
                />
            </div>
        </div>
    )
}