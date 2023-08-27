import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { ContactsPage } from './ContactsPage';

test('should be rendered Contacts us page', () => {
  render(
    <BrowserRouter>
      <ContactsPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Contacts us/i);
  expect(titleElement).toBeInTheDocument();
  const buttonElement = screen.getAllByRole('button');
  buttonElement.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});
