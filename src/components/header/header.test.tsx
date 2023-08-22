import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

test('should be rendered Header', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});
