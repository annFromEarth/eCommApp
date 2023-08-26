import { Route, Routes } from 'react-router-dom';
import About from '../../pages/About/AboutPage';
import { CartPage } from '../../pages/Cart/CartPage';
import { ContactsPage } from '../../pages/Contacts/ContactsPage';
import { GuaranteePage } from '../../pages/Guarantee/GuaranteePage';
import { LoginPage } from '../../pages/Login/LoginPage';
import MainPage from '../../pages/Main/MainPageCreate';
import { NotFoundPage } from '../../pages/NotFound/NotFound';
import { PlantsPage } from '../../pages/Plants/PlantsPage';
import { QuestionsPage } from '../../pages/Questions/QuestionsPage';
import { RegistrationPage } from '../../pages/Registration/RegistrationPage';
import { ShippingPage } from '../../pages/Shipping/ShippingPage';
import { WorkshopsPage } from '../../pages/Workshops/WorkshopsPage';
import { PATH } from '../../data/path';

function RoutingApp() {
  return (
    <Routes>
      <Route path={PATH.main} element={<MainPage />} />
      <Route path={PATH.login} element={<LoginPage />} />
      <Route path={PATH.register} element={<RegistrationPage />} />
      <Route path={PATH.cart} element={<CartPage />} />
      <Route path={PATH.plants} element={<PlantsPage />} />
      <Route path={PATH.workshops} element={<WorkshopsPage />} />
      <Route path={PATH.about} element={<About />} />
      <Route path={PATH.questions} element={<QuestionsPage />} />
      <Route path={PATH.shipping} element={<ShippingPage />} />
      <Route path={PATH.guarantee} element={<GuaranteePage />} />
      <Route path={PATH.contacts} element={<ContactsPage />} />
      <Route path={PATH.incorrect} element={<NotFoundPage />} />
    </Routes>
  );
}

export default RoutingApp;
