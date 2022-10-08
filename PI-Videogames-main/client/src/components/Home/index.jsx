import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { filterGameByCreation,getVideogames,
         filterByGenres, orderByName, orderByRating,
         updatePage } from "../../actions/action";
import { Link } from "react-router-dom";
import Videogame from "../Videogame";
import style from'./style.module.css'
import Paginado from "../Paginado";
import SearchBar from '../SearchBar';
import imagenRog from '../../recursos/img/AsusRogXXL.jpg'
import imagenLoading from '../../recursos/img/loading.gif'

export default function Home (){
    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.games)//traigo del reducer el stado games
    const allGenres = useSelector((state) => state.genres)
    const globalPage = useSelector((state) => state.page)
    const [orden, setOrden] = useState('Ordenamiento: ninguno')

    const [currentPage, setCurrentPage] = useState(globalPage)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage// 1*15=15   2*15=30
    const indexOfFirstGame = indexOfLastGame - gamesPerPage//15-15=0   30-15=15
    const currentGames = allGames.slice(indexOfFirstGame,indexOfLastGame) //0-15   15-30

    function handleUpdatePage (pageNumber){
        setCurrentPage(pageNumber)
        dispatch(updatePage(pageNumber))
    }
    function handleUpdatePagePrev(){
        setCurrentPage(globalPage-1)
        dispatch(updatePage(globalPage-1))
    }
    function handleUpdatePageNext(){
        setCurrentPage(globalPage+1)
        dispatch(updatePage(globalPage+1))
    }
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
        setOrden(`Ordenamiento: ${e.target.value}`)
    }
    function handleOrderByRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setOrden(`Ordenamiento: ${e.target.value}`)
    }

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
                        <option key = '0' value = 'all'>Todos</option>
                        <option key = '1' value = 'max'>Rating alto</option>
                        <option key = '2' value = 'min'>Rating bajo</option>
                    </select>
                </div>
                <div className={style.containerAlphabetic}>
                    <label>{orden}</label>
                    <select className={style.cbox} onChange = {e=> handleOrderByName(e)}>
                        <option key = '0' value = 'all'>Todos</option>              
                        <option key = '1' value = 'az'>A/Z</option>
                        <option key = '2' value = 'za'>Z/A</option>
                    </select>
                </div>
            </div>
            <Paginado
            gamesPerPage = {gamesPerPage} 
            allGames = {allGames.length} 
            paginado = {handleUpdatePage}
            prev = {handleUpdatePagePrev}
            next = {handleUpdatePageNext}
            />

            <div className={style.containerCards} >
                <div className={style.cards}>
                    { currentGames.length ?
                        currentGames?.map(el => {
                        return(
                            <div key = {el.id} className={style.card}>
                                <Link to ={`/${el.id}`} key = {el.id}>
                                    <Videogame key = {el.id}  
                                        name = {el.name} 
                                        image = {el.background_image? el.background_image :imagenRog}
                                        genres = {el.genres}
                                    />
                                </Link>
                            </div>
                        )                       
                    }) : <div>
                        <h1>Cargando datos, espere porfavor...</h1>
                            <img src = {imagenLoading} alt = 'loading'/>
                        </div>
                    }
                </div>
            </div>
            <Paginado 
            gamesPerPage = {gamesPerPage} 
            allGames = {allGames.length} 
            paginado = {handleUpdatePage}
            prev = {handleUpdatePagePrev}
            next = {handleUpdatePageNext}
            />
        </div>

    )
}