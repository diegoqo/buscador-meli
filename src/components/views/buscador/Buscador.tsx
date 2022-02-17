import React, { FormEvent, useState } from 'react';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import { IProductos, IResponseQuery } from '../../../modelo/interfaces';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Buscador = () => {

    return(
        <div>
            <CajaBusqueda />
        </div>

);
}


export default Buscador;


