import Buscador from '../../../../components/views/buscador/Buscador';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Probando el componente Buscador', () => {

    it('debería mostrar Buscador correctamente', () => {
        const { asFragment } = render(<BrowserRouter><Buscador/></BrowserRouter>);
        expect(asFragment()).toMatchSnapshot();
    })
})
