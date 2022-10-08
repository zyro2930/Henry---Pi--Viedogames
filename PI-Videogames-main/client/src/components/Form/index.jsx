import React from "react";

import { getGenres, postVideogame, getPlatforms,getVideogames } from "../../actions/action";
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
    }else if (input.rating > 5){
        errors.rating ='El valor maximo de rating permitido es 5 (cinco).'
    }else if (input.rating < 1){
        errors.rating = 'El valor minimo de rating permitido es 1 (uno).'
    }
    return errors
}
function validarFecha(fecha){
    if(validarFormatoFecha(fecha)){
        if(!existeFecha(fecha))return false
    }else return false
    return true
}

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}-\d{1,2}-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo!=='')) {
          return true
    } else return false
}
function existeFecha(fecha){
    var fechaf = fecha.split("/");
    var day = fechaf[2];
    var month = fechaf[1];
    var year = fechaf[1];
    var date = new Date(year,month,'0');
    if((day-0)>(date.getDate()-0)){
          return false;
    }
    return true;
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
        }else if(!validarFecha(input.launch)){
            alert ('Fecha invalida')
        }else if (!input.rating){
            alert('El videojuego debe tener un rating inicial.')
        }else if (input.rating < 1 || input.rating > 5){
            alert('El valor minimo es 1(uno) y el maximo es 5 (cinco).')
        // }else if (input.rating < 1){
        //     alert('El valor minimo de rating permitido es 1 (uno).')
        }else if (input.platformsArray.length<1){
            alert( 'Debe seleccionar al menos una plataformaaaa.',input.platformsArray.length)
        }else if (!input.genres.length){
            alert( 'Debe seleccionar al menos un genero.')
        }else{
            dispatch(postVideogame(input))
            dispatch(getVideogames());
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
        <div className={style.create}>
            <div className={style.content}>
                <div className={style.encabezado}>
                <Link to={'/home'}><button className={style.BtnHome}>Inicio</button></Link>
                <h1>Crea tu videojuego...</h1>
                </div>
                <form className = {style.form} onSubmit={e=> handleSubmit(e)}>
                    <div>
                        <label htmlFor='name' className= {style.lblText} >Nombre: </label>
                        <input id='name'  className= {style.txt}  type={'text'} name={'name'} value={input.name} onChange={e=>handleChange(e)}/>
                        {errors.name && (
                            <p className = {style.errors}>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='description' className= {style.lblText} >Descripcion: </label>
                        <input id='description' className= {style.txt} type={'text'} name={'description'} value={input.description} onChange={e=>handleChange(e)}/>
                        {errors.description && (
                            <p className = {style.errors}>{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor = 'lauch' className= {style.lblText} >Lanzamiento: </label>
                        <input id='lauch' className= {style.txt} type={'date'} name={'launch'} value={input.launch} onChange={e=>handleChange(e)}/>
                        {errors.launch && (
                            <p className = {style.errors}>{errors.launch}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor ='rating' className= {style.lblText} >Rating: (del 1 al 5) </label>
                        <input id='rating' className= {style.txt} type={'number'} name={'rating'} value={input.rating}  onChange={e=>handleChange(e)}/>
                        {errors.rating && (
                            <p className = {style.errors}>{errors.rating}</p>
                        )}
                    </div>
                    <div className={style.allChecks}>
                        <div className = {style.platforms}>
                            <label  className={style.platformTitle} >Plataformas: </label>
                            <div className={style.platformsChecks}>
                                {
                                    platforms.map( p=>(
                                        <label className={style.platformLbl} key={p.id}>
                                            <input className={style.platformCheck} type={'checkbox'}
                                            key={p.id} name={p.name}
                                            value={p.name} onClick={e=>handleCheckPlatforms(e)}/>{p.name}
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className = {style.genres}>
                            <label className={style.genreTitle}>Generos:</label>
                            <div className={style.genresChecks}>
                                {
                                    genres.map( g=>(
                                        <label className={style.genreLbl} key={g.id}>
                                            <input className={style.genreCheck} type={'checkbox'}
                                            key={g.id} name={g.name}
                                            value={g.id} onClick={e=>handleCheckGenres(e)}/>{g.name}
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor ='imagen' className= {style.lblText} >Imagen:(no obligatorio) </label>
                        <input id ='imagen' className= {style.txt} type={'text'}
                        name={'background_image'} value ={input.background_image}
                        onChange={e=>handleChange(e)}/>
                    </div>
                    <button className={style.BtnGuardar} type="submit">Guardar</button>
                </form>
            </div>
        </div>
    )
}