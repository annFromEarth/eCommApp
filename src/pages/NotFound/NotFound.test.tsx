import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFound';

test('should be rendered NotFound page', () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/The page you requested was not found/i);
  expect(titleElement).toBeInTheDocument();
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
});
