import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationPage } from './RegistrationPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

test('should be rendered Registration page', () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    </LocalizationProvider>
  );
  const titleElement = screen.getByText('Shipping Address');
  expect(titleElement).toBeInTheDocument();
});
