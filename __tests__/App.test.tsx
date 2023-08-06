import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';

describe('App.test', () => {
  it('should be rendered', () => {
    render(<App />);
    const myAwesomeButton = screen.getByRole('button');
    expect(myAwesomeButton).not.toBeDisabled();
  });
});
