import React, { useEffect } from 'react';
import CajaBusqueda from '../../common/cajabusqueda/CajaBusqueda';


const Buscador = () => {

    useEffect(() => {
        localStorage.clear();
    }, []);


    return(
        <>
            <CajaBusqueda key={'caja-busqueda'} />
        </>

);
}

export default Buscador;


