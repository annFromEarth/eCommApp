import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';

test('should be rendered Shipping page', () => {
  render(
    <BrowserRouter>
      <ProfilePage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('User Profile');
  expect(titleElement).toBeInTheDocument();
});
