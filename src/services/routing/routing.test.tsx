import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../../App';

describe('App', () => {
  it('renders Main page App component by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText(/browse plants/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('follow the login link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const loginLink = getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    fireEvent.click(loginLink);
    const textElementLogin = getByText(/New here/i);
    expect(textElementLogin).toBeInTheDocument();
    const registerLink = getByText(/Create an account/i);
    fireEvent.click(registerLink);
    const textElementRegister = getByText(/First Name/i);
    expect(textElementRegister).toBeInTheDocument();
  });

  it('follow the register link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const registerLink = getByText('REGISTER');
    expect(registerLink).toBeInTheDocument();
    fireEvent.click(registerLink);
    const textElement = getByText(/Already have an account/i);
    expect(textElement).toBeInTheDocument();
    const loginLink = getByText('LOGIN');
    fireEvent.click(loginLink);
    const textElementLogin = getByText('Login Page');
    expect(textElementLogin).toBeInTheDocument();
  });

  it('follow the cart link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/cart/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('Cart');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the plants link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/plants/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('Plants');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the workshops link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/workshops/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('Online & Retail Workshops');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the about link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/about/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('☀ Learn more about us ☀');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the FAQ link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText(/FAQ/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('Common Questions');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the shipping link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText('✿ Shipping ✿');
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('2-6 business days');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the guarantee link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText('✿ Guarantee ✿');
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const textElement = getByText('the first 30 days');
    expect(textElement).toBeInTheDocument();
  });

  it('follow the link Contacts us', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const button = getByText(/✿ Contact us ✿/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const textContacts = getByText(/We will be happy to communicate with you/i);
    expect(textContacts).toBeInTheDocument();
  });
});
