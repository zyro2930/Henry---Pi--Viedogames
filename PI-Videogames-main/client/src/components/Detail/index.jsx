import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById, clearDetail } from "../../actions/action";
import { useEffect } from "react";
import style from './style.module.css'
import imagenRog from '../../recursos/img/AsusRogXXL.jpg'

export default function Detail (props){
    const videogameDetails = useSelector(state=>state.detail)// aca busco ese estado global

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getVideogameById(props.match.params.id))
        return ()=> dispatch(clearDetail())
    },[dispatch])

    return(
        <div className={style.contenedor}>
            <div className={style.todo}>
                <div className={style.data}>  
                <Link to={'/home'}><button className={style.BtnHome}>
                    Home</button></Link>
                            
                    <h1 className={style.title}>{videogameDetails.name}</h1>                            
                </div>

                <div className={style.imgContainer}>
                    <img className={style.imgGame}
                    src ={videogameDetails.background_image?
                        videogameDetails.background_image :imagenRog} 
                    alt ='' width={'300px'} height={'200px'}/>
                </div>

                <p className={style.description}>{videogameDetails.description}</p>
                <br/>
                <div className={style.footer}>                
                <h4>{videogameDetails.platforms?.replaceAll(',',', ') + '.'}</h4>
                <h4>{videogameDetails.genres?.map(g => ' ' + g.name).toString() + '.'.trim()}</h4>
                <h4>Rating: {videogameDetails.rating}</h4>
                </div>
            </div>
        </div>
    )
}