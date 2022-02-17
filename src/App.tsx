import React from 'react';
import './App.scss';
import axios from 'axios';
import Buscador from './components/views/buscador/Buscador';
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Productos from './components/views/productos/Productos';
import Detalle from './components/views/detalle/Detalle';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Buscador/>}/>
                <Route path={'items'} element={<Productos/>}/>
                <Route path={'items/:id'} element={<Detalle/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </div>
    );
}

export default App;
