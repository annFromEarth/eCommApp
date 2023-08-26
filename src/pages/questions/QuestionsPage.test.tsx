import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QuestionsPage } from './QuestionsPage';
import { BrowserRouter } from 'react-router-dom';

test('should be rendered Questions page', () => {
  render(
    <BrowserRouter>
      <QuestionsPage />
    </BrowserRouter>
  );
  const title = screen.getByText(/Common Questions/i);
  expect(title).toBeInTheDocument();
});
