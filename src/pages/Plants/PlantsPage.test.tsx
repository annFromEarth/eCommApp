import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { PlantsPage } from './PlantsPage';

test('should be rendered Plants page', () => {
  render(
    <BrowserRouter>
      <PlantsPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Plants');
  expect(titleElement).toBeInTheDocument();
});
