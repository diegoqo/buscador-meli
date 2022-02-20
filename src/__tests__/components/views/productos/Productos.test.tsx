import { cleanup, render } from '@testing-library/react';
import Productos from '../../../../components/views/productos/Productos';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Probando el componente Productos', () => {

    it('debería mostrar Productos correctamente', () => {
        const { asFragment } = render(<BrowserRouter><Productos/></BrowserRouter>);
        expect(asFragment()).toMatchSnapshot();
    })
})
