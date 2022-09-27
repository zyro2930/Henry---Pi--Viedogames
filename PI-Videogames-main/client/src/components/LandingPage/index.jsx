import React from "react";
//import { useNavigate } from 'react-router-dom';
import style from'./style.module.css'
import { Link } from "react-router-dom";

export default function LandingPage (){
    //const navigate = useNavigate();
    return(
        <div className={style.component}>
            <div className={style.container}>
                <h1>Bienvenido gamer!</h1>                     
                <p>Este sitio es totalmente gratuito, fue construido con fines educativos 
                    gracias a los conocimientos adquiridos en HENRY 
                    (todos los derechos reservados). Los datos obtenidos en esta app
                    son propiedad de Rawg (todos los derechos reservados).
                    Que lo disfrutes!
                </p>            
                <Link to = {'/home'}><button>Start!</button></Link>
            </div>
      </div>
    )
}