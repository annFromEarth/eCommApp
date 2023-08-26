import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

test('should be rendered Footer', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('✿ Contact us ✿');
  expect(linkElement).toBeInTheDocument();
});
