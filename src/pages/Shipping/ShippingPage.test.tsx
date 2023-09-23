import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { ShippingPage } from './ShippingPage';

test('should be rendered Shipping page', () => {
  render(
    <BrowserRouter>
      <ShippingPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Shipping');
  expect(titleElement).toBeInTheDocument();
  const textElement = screen.getByText('1-2 business days');
  expect(textElement).toBeInTheDocument();
});
