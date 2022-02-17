import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'


const Buscador = () => {
    const [query, setQuery] = useState("");

    const updateQuery = () => {
        if(query !== ""){
            axios.get('http://localhost:8080/search-description', {
                params: {query: query}
            }).then(response => {
                console.log(response.data)
            })
        }

    };

    const delayedQuery = useCallback(debounce(updateQuery, 1500), [query]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('query', query);
        updateQuery();
    }

    useEffect(() => {
        delayedQuery();
        return delayedQuery.cancel;
    }, [query, delayedQuery]);

    return(
        <div>
            <div>Hola soy buscador</div>
            <form onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    value={query}
                    onChange={onChange}
                />
                <button type={'submit'}>Buscar</button>
            </form>

        </div>

);
}


export default Buscador;


