import { cleanup, render } from '@testing-library/react';
import CajaBusqueda from '../../../../components/common/cajabusqueda/CajaBusqueda';
import { BrowserRouter } from 'react-router-dom';


afterEach(cleanup);

it("validate input search", () => {
    const { getByTestId } = render(<BrowserRouter><CajaBusqueda /></BrowserRouter>);

    expect(getByTestId("input-busqueda")).toHaveTextContent("");
});

it("validate snapshot input search", () => {
    const { asFragment } = render(<BrowserRouter><CajaBusqueda /></BrowserRouter>);

    expect(asFragment()).toMatchSnapshot();
});
