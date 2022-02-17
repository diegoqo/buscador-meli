import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';


function useQuery(queryParam: string) {
    const [searchParams] = useSearchParams();

    return useMemo(() => searchParams.get(queryParam), [queryParam]);
}

const Productos = () => {
    const query = useQuery('search');
    return(
        <>
            <div>Hola soy Productos</div>
            <CajaBusqueda />
        </>

    );
}


export default Productos;
