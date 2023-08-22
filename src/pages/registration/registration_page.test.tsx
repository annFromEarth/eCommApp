import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationPage } from './registration_page';

test('should be rendered Registration page', () => {
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Register');
  expect(titleElement).toBeInTheDocument();
});
