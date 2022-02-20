import { cleanup, render } from '@testing-library/react';
import Detalle from '../../../../components/views/detalle/Detalle';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Probando el componente Detalle', () => {

    it('debería mostrar Detalle correctamente', () => {
        const { asFragment } = render(<BrowserRouter><Detalle/></BrowserRouter>);
        expect(asFragment()).toMatchSnapshot();
    })
})
