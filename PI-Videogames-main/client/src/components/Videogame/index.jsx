import React from "react";
import style from'./style.module.css'

export default function Videogame({name,image,genres}){
    return (
        <div className={style.container}>
            <div className={style.component}>
                <img src={image} alt = 'not found game' width='220px' height='150px'/>
                <h3 className={style.Nom}>{name}</h3>
                <p>{genres.map(g => g.name).join(', ')}</p>
            </div>
        </div>
    )
}