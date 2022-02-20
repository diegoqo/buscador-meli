import React from 'react';
import './App.scss';
import Buscador from './components/views/buscador/Buscador';
import { Navigate, Route, Routes, } from "react-router-dom";
import Productos from './components/views/productos/Productos';
import Detalle from './components/views/detalle/Detalle';

function App() {
    return (
        <div className="App" style={{width: '100%'}}>
            <Routes>
                <Route path={'/'} element={<Buscador/>} key={'router-buscador'}/>
                <Route path={'items'} element={<Productos/>} key={'router-productos'}/>
                <Route path={'items/:id'} element={<Detalle/>} key={'router-detalle'}/>
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                    key={'router-default'}
                />
            </Routes>
        </div>
    );
}

export default App;
