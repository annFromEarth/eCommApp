import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import About from './AboutPage';

test('should be rendered About page', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
  const textElement = screen.getByText(/Learn more about us/i);
  expect(textElement).toBeInTheDocument();
});
