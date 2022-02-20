import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MigaDePan from '../../../../components/common/migadepan/MigaDePan';


afterEach(cleanup);

it("valida miga de pan", () => {
    const { asFragment } = render(<BrowserRouter><MigaDePan categorias={[]} /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
});
