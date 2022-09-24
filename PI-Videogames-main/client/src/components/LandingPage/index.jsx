import React from "react";
//import { useNavigate } from 'react-router-dom';
import style from'./style.module.css'
import { Link } from "react-router-dom";

export default function LandingPage (){
    //const navigate = useNavigate();
    return(
        <div className={style.component}>
            <h1>ROG Videogames</h1>
            <Link to = {'/home'}><button>Start!</button></Link>
      </div>
    )
}