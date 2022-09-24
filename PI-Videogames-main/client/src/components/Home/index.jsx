import React from "react";
//import {useState,useEffect} from 'react'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideogames } from "../../actions/action";
import { Link } from "react-router-dom";
import Videogame from "../Videogame";
import style from'./style.module.css'

export default function Home (){

    const dispatch = useDispatch()
    //useSelector es lo mismo que hacer el mapStateToProps, 
    //es mas facil porque me declaro una constante y traeme en esa constante 
    //todo lo que esta en el estado de games
    const allGames = useSelector((state) => state.games)

    useEffect(()=>{
        dispatch(getVideogames());
    },[dispatch])

    function handleClick(e){
        e.preventDeafault()
        dispatch(getVideogames());
    }
    return(
        <div >
            <Link to ='/'>Cargar videojuego</Link>
            <button onClick={ e=> {handleClick(e)}}>Recargar games</button>
            <div>
                <select>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
                </select>
                <select>
                    <option value = 'gamesDb'>Juegos creados</option>
                    <option value = 'gamesApi'>Api</option>
                </select>
                <select>
                    <option>A/Z</option>
                    <option>Z/A</option>
                </select>
                <div className={style.cards}>
                    {allGames &&  allGames.map(el => {
                        return(
                            <div className={style.card}>
                                <Link to={'/details'}>
                                <Videogame key = {el.id}  name = {el.name} 
                                image = {el.background_image} genres={el.genres}/>
                                </Link>
                            </div>
                        )                       
                    })}
                </div>
            </div>
        </div>
    )
}