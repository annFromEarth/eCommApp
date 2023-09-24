import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import '@fontsource-variable/nunito';
import './components/registrationForm/registrationForm.css';
import './reset.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
