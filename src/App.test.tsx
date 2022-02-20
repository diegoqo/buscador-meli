import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('Probando App', () => {
  it('renders learn react link', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText(/Escribí tu búsqueda/i);
    expect(linkElement).toBeInTheDocument();
  });
})


