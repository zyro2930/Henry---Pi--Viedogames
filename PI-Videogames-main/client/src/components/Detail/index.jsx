import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../../actions/action";
import { useEffect } from "react";


export default function Detail (props){
    console.log(props)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getVideogameById(props.match.params.id))
    },[dispatch])

    const videogameDetails = useSelector(state=>state.detail)
    return(
        <div>
            <Link to={'/home'}><button>Home</button></Link>
            <h1>Videojuego:{videogameDetails.name}</h1>
            <img src ={videogameDetails.background_image} alt ='' width={'700px'} height={'500px'}/>
            <p>Descripcion:{videogameDetails.description}</p>

        </div>
    )
}