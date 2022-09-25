import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../actions/action";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName]=useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){        
        e.preventDefault()
        dispatch(getVideogamesByName(name))
    }
    function handleSubmitEnter(e){   
        if (e.keyCode ===13)     {
            e.preventDefault()
            dispatch(getVideogamesByName(name))
        }        
    }
    return(
    <div>
        <input type={'text'} placeholder ='buscar...' onChange={e=> handleInputChange(e)}
        onKeyDown ={e=>handleSubmitEnter(e)}></input>
        <button type='submit' onClick={e=>handleSubmit(e)}>Buscar</button>
    </div>
    )
}