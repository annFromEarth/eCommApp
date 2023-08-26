import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';

test('should be rendered Login page', () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Login Page');
  expect(titleElement).toBeInTheDocument();
  const buttonElement = screen.getAllByRole('button');
  buttonElement.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});
