import React from "react";
import style from './style.module.css'

export default function Paginado({gamesPerPage,allGames,paginado}){
    const pageNumber=[]
    for(let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++)
    pageNumber.push(i)
    return(
        <nav>
            <div className = {style.container}>
                <div className = {style.wall}>
                    {pageNumber && pageNumber.map(n => (
                        <button  className = {style.buttons} key={n} onClick={()=> paginado(n)}>{n} </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}