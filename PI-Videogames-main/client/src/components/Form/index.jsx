import React from "react";
import { getGenres, postVideogame, getPlatforms } from "../../actions/action";
import {useDispatch, useSelector} from'react-redux'
import { useState } from "react";
import { useEffect } from "react";
import {Link} from 'react-router-dom'

export default function PostVideogame (){
    let dispatch = useDispatch()
    const platforms = useSelector(state => state.platforms)
    const genres = useSelector(state => state.genres)


    const [input,setInput]=useState({
        name:'',
        description: '',
        launch: '',
        rating: '',
        background_image: '',
        platforms: [],
        genres:[]        
    })
     useEffect(()=>{
        dispatch(getPlatforms())
        dispatch(getGenres())
     },[dispatch])

    return(
        <div>
                <Link to={'/home'}><button>Home</button></Link>
                <h1>Crea tu videojuego</h1>
                <form>
                    <div>
                        <label>Nombre</label>
                        <input type={'text'} value={input.name}/>
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input type={'text'} value={input.description}/>
                    </div>
                    <div>
                        <label>Lanzamiento</label>
                        <input type={'date'} value={input.launch}/>
                    </div>
                    <div>
                        <label>Rating</label>
                        <input type={'number'} value={input.rating}/>
                    </div>
                    <div>
                        <label>Plataformas</label>
                        <select>
                            {
                                platforms.map(p=>(
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label>Generos</label>
                        <select>
                            {
                                genres.map(g=>(
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                ))
                            }
                            
                        </select>
                    </div>
                </form>
        </div>
    )
}