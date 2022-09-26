import React from "react";
import { getGenres, postVideogame, getPlatforms } from "../../actions/action";
import {useDispatch, useSelector} from'react-redux'
import { useState } from "react";
import { useEffect } from "react";
import {Link, useHistory} from 'react-router-dom'
import style from'./style.module.css'

function validate(input){
    let errors = {}
    if (!input.name){
        errors.name = 'Debe cargar el nombre del videojuego.'
    }else if (!input.description){
        errors.description ='Debe cargar la descripcion del videojuego.'
    }else if (!input.launch){
        errors.launch = 'Debe cargar la fecha de lanzamiento del videojuego.'
    }else if (!input.rating){
        errors.rating ='El videojuego debe tener un rating inicial.'
    }else if (input.rating>5){
        errors.rating ='El valor maximo de rating permitido es 5 (cinco).'
    }
    return errors
}

export default function PostVideogame (){
    let dispatch = useDispatch()
    const history = useHistory()
    const platforms = useSelector(state => state.platforms)
    const genres = useSelector(state => state.genres)
    const [errors, setErrors] = useState({})

    const [input,setInput] = useState({
        name:'',
        description: '',
        launch: '',
        rating: '',      
        platformsArray: [],
        genres:[],
        background_image: '',   
    })
     useEffect(()=>{
        dispatch(getPlatforms())
        dispatch(getGenres())
     },[dispatch])

     function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
     }

     function handleSubmit(e){
        e.preventDefault()
        if (!input.name){
            alert('Debe cargar el nombre de un videojuego.')
        }else if (!input.description){
            alert('Debe cargar la descripcion del videojuego.')
        }else if(!input.launch){
            alert('debe colocar la fecha de lanzamiento')
        }else if (!input.rating){
            alert('El videojuego debe tener un rating inicial.')
        }else if (input.rating>5){
            alert('El valor maximo de rating permitido es 5 (cinco).')
        }else if (input.platformsArray.length<1){
            alert( 'Debe seleccionar al menos una plataformaaaa.',input.platformsArray.length)
        }else if (!input.genres.length){
            alert( 'Debe seleccionar al menos un genero.')
        }else{       
            console.log(input)
            dispatch(postVideogame(input))
            alert('Videojuego creado.')
            setInput({
                name:'',
                description: '',
                launch: '',
                rating: '',
                background_image: '',
                platforms: '',
                platformsArray: [],
                genres:[] 
            })
            history.push('/home')
        }
     }
     function handleCheckPlatforms(e){
        if (e.target.checked){
            setInput({
                ...input,
                platformsArray:[...input.platformsArray, e.target.value],
            })            
        }else{
            setInput({
                ...input,                
                platformsArray: input.platformsArray.filter(p=> p !== e.target.value),
            })
        }
     }

     function handleCheckGenres(e){
        if (e.target.checked){
            setInput({
                ...input,
                genres:[...input.genres, e.target.value]
            })
        }else{
            setInput({
                ...input,
                genres: input.genres.filter(g=> g !== e.target.value)
            })
        }
     }

    return(
        <div>
                <Link to={'/home'}><button>Home</button></Link>
                <h1>Crea tu videojuego</h1>
                <form onSubmit={e=> handleSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input type={'text'} name={'name'} value={input.name} onChange={e=>handleChange(e)}/>
                        {errors.name && (
                            <p className={''}>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Descripcion: </label>
                        <input type={'text'} name={'description'} value={input.description} onChange={e=>handleChange(e)}/>
                        {errors.description && (
                            <p className={''}>{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label>Lanzamiento: </label>
                        <input type={'date'} name={'launch'} value={input.launch} onChange={e=>handleChange(e)}/>
                        {errors.launch && (
                            <p className={''}>{errors.launch}</p>
                        )}
                    </div>
                    <div>
                        <label>Rating: </label>
                        <input type={'number'} name={'rating'} value={input.rating}  onChange={e=>handleChange(e)}/>
                        {errors.rating && (
                            <p className={''}>{errors.rating}</p>
                        )}
                    </div>
                    <div  className = {style.checkPlatforms}>
                        <label>Plataformas: </label>
                        {
                            platforms.map( p=>(
                                <label key={p.id}>
                                    <input type={'checkbox'} key={p.id} name={p.name} 
                                    value={p.name} onClick={e=>handleCheckPlatforms(e)}/>{p.name}
                                </label>
                            ))
                        }
                    </div>
                    <div className = {style.checkGenres}>
                        <label>Generos: </label>
                        {
                            genres.map( g=>(
                                <label key={g.id}>
                                    <input type={'checkbox'} key={g.id} name={g.name} 
                                    value={g.id} onClick={e=>handleCheckGenres(e)}/>{g.name}
                                </label>
                            ))
                        }                        
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input type={'text'} name={'background_image'} value ={input.background_image} 
                        onChange={e=>handleChange(e)}/>
                    </div>
                    <button type="submit">Guardar</button>
                </form>
        </div>
    )
}