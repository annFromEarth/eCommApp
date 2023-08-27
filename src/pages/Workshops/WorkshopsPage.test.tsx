import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { WorkshopsPage } from './WorkshopsPage';

test('should be rendered Workshops page', () => {
  render(
    <BrowserRouter>
      <WorkshopsPage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Online & Retail Workshops');
  expect(titleElement).toBeInTheDocument();
});

test('should be rendered Workshops page: upcoming events', () => {
  render(
    <BrowserRouter>
      <WorkshopsPage />
    </BrowserRouter>
  );
  const upcomingButton = screen.getByText(/upcoming/i);
  expect(upcomingButton).toBeInTheDocument();
  const firstCard = screen.getByText('The FLORAPHILIE Lab Cafe');
  expect(firstCard).toBeInTheDocument();
});

test('should be rendered Workshops page: past events', () => {
  render(
    <BrowserRouter>
      <WorkshopsPage />
    </BrowserRouter>
  );
  const pastButton = screen.getByText(/past/i);
  expect(pastButton).toBeInTheDocument();
  fireEvent.click(pastButton);
  const firstCard = screen.getByText('Cactus: Plant Care Workshop');
  expect(firstCard).toBeInTheDocument();
});
