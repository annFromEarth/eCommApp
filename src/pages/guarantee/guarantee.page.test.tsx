import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { GuaranteePage } from './guarantee_page';

test('should be rendered Guarantee page', () => {
  render(
    <BrowserRouter>
      <GuaranteePage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Guarantee');
  expect(titleElement).toBeInTheDocument();
  const textElement = screen.getByText(/30-Day Customer Happiness Guarantee/i);
  expect(textElement).toBeInTheDocument();
});
