import React from 'react';
import { useParams } from 'react-router-dom';


const Detalle = () => {
    const { id } = useParams();
    return(
        <>
            <div>Hola soy detalle</div>
            <p>id es: {id}</p>
            <input/>
        </>

    );
}


export default Detalle;
