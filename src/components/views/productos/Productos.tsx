import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';


function useQuery(queryParam: string) {
    const [searchParams] = useSearchParams();

    return useMemo(() => searchParams.get(queryParam), [queryParam]);
}

const Productos = () => {
    const test = useQuery('search');
    console.log(test);
    return(
        <>
            <div>Hola soy Productos</div>
            <input/>
        </>

    );
}


export default Productos;
