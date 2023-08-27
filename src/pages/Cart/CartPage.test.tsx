import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from './CartPage';

test('should be rendered Cart page', () => {
  render(
    <BrowserRouter>
      <CartPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/cart/i);
  expect(titleElement).toBeInTheDocument();
});
