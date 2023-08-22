import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { BasketPage } from './basket_page';

test('should be rendered Basket page', () => {
  render(
    <BrowserRouter>
      <BasketPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/basket/i);
  expect(titleElement).toBeInTheDocument();
});
