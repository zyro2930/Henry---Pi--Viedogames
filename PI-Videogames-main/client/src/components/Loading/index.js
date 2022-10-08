import React from "react";
import imagenLoading from '../../recursos/img/loading.gif'

export default function Loading() {
    return (
        <div>
            <h1>Cargando datos espere por favor</h1>
            <img src = {imagenLoading} alt = 'loading'/>
        </div>
    )
}