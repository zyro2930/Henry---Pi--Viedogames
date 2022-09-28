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
    const [orden, setOrden] = useState('Ordenamiento: ninguno')

    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(0)
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
        setGamesPerPage(15) 
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
        setOrden(`Ordenamiento: ${e.target.value}`)
    }
    function handleOrderByRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenamiento: ${e.target.value}`)
    }

    let contador =0
    return(    
        <div className={style.component}>
            <div className={style.NavBar}>
                <div className={style.buttonAll}>
                    <Link to =''><button className={style.buttonHome} onClick={ e=> {handleClickHome(e)}}>
                        Home</button></Link>
                    <Link to ='/create'><button className={style.buttonNew} >Nuevo</button></Link>
                </div>
                <div className={style.containerSearchBar}>
                    <label>Buscador de Juegos</label>
                    <SearchBar></SearchBar>
                </div>
                <div className={style.containerGenres}>
                    <label>Generos</label>
                    <select className={style.cbox} onChange={e=>handleFilterGenres(e)}>
                    <option key = '0' value = 'all'>Todos</option>
                        {allGenres?.map(g => {
                            return (<option key ={g.id} value = {g.name}> {g.name} </option>)
                        })}
                    </select>
                </div>
                <div className={style.containerCreated}>
                    <label>Creados</label>
                    <select className={style.cbox} onChange = {e => handleFilterCreated(e)}>
                        <option key = '0' value = 'all'>Todos</option>
                        <option key = '1' value = 'db'>Juegos creados</option>
                        <option key = '2' value = 'api'>Api</option>
                    </select>
                </div>
                <div className={style.containerRating}>
                    <label>Rating</label>
                    <select className={style.cbox} onChange = {e => handleOrderByRating(e)}>
                        <option key = '0' value = 'max'>Rating alto</option>
                        <option key = '1' value = 'min'>Rating bajo</option>
                    </select>
                </div>
                <div className={style.containerAlphabetic}>
                    <label>{orden}</label>
                    <select className={style.cbox} onChange = {e=> handleOrderByName(e)}>                    
                        <option key = '0' value = 'az'>A/Z</option>
                        <option key = '1' value = 'za'>Z/A</option>
                    </select>
                </div>
            </div>
            <Paginado key= {contador++}
            gamesPerPage = {gamesPerPage} 
            allGames = {allGames.length} 
            paginado = {paginado}
            />
            <div className={style.containerCards} >
                <div className={style.cards}>
                    {currentGames?.map(el => {
                        return(
                            <div key = {el.id} className={style.card}>
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
            </div>
            <Paginado 
            gamesPerPage = {gamesPerPage} 
            allGames = {allGames.length} 
            paginado = {paginado}
            />
        </div>

    )
}