import React, { FormEvent, useEffect, useState } from 'react';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import { IProductos, IResponseQuery } from '../../../modelo/interfaces';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Buscador = () => {

    useEffect(() => {
        localStorage.clear();
    }, []);


    return(
        <div>
            <CajaBusqueda />
        </div>

);
}


export default Buscador;


