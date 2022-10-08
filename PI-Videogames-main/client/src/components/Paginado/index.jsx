import React from "react";
import style from './style.module.css'
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

export default function Paginado({gamesPerPage, allGames, paginado,prev,next}){
    
    const [togglePrev,setTogglePrev] = useState(true)//desactivado = true
    const [toggleNext,setToggleNext] = useState(false)//desactivado = false
    const globalPage = useSelector((state) => state.page)
    useEffect(()=>{
        globalPage === pageNumber.length?setToggleNext(true):setToggleNext(false)
        globalPage === 1?setTogglePrev(true):setTogglePrev(false)
    },[globalPage])

    const pageNumber=[]
    //                            100 / 6 = 6.66 -> 7
    for(let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++){
        pageNumber.push(i)
    }
    
    return(
        <nav>
            <div className = {style.container}>
                <div className = {style.wall}>
                    <button className = {style.buttons} key={'1g1'} disabled={togglePrev} onClick={()=>prev()}>Prev</button>
                    {pageNumber?.map(num => (
                        <button  className = {style.buttons} key={num} onClick={()=> paginado(num)}>{num} </button>
                    ))}
                    <button className = {style.buttons} key={'2g2'} disabled={toggleNext} onClick={()=>next()}>Next</button>
                </div>
            </div>
        </nav>
    )
}