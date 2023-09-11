import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { ProductPage } from './ProductPage';

test('should be rendered Product page', () => {
  render(
    <BrowserRouter>
      <ProductPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/product/i);
  expect(titleElement).toBeInTheDocument();
});
