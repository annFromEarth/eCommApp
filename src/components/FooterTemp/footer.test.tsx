import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import Footer from './FooterTemp';

test('should be rendered Footer', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const linkElement = screen.getByText('✿ Contact us ✿');
  expect(linkElement).toBeInTheDocument();
});
