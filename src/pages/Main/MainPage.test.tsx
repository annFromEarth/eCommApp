import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

test('should be rendered Main page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Welcome plant lovers!');
  expect(titleElement).toBeInTheDocument();
  const textElement = screen.getByText(/Audrey Hepburn/i);
  expect(textElement).toBeInTheDocument();
});
