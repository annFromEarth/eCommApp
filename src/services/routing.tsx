import { Route, Routes } from 'react-router-dom';
import About from '../pages/about/about';
import { BasketPage } from '../pages/basket/basket_page';
import { ContactsPage } from '../pages/contacts/contacts_page';
import { GuaranteePage } from '../pages/guarantee/guarantee_page';
import { LoginPage } from '../pages/login/login_page';
import MainPage from '../pages/main/main_page-create';
import { NotFoundPage } from '../pages/not-found/not-found';
import { PlantsPage } from '../pages/plants/plants_page';
import { QuestionsPage } from '../pages/questions/questions_page';
import { RegistrationPage } from '../pages/registration/registration_page';
import { ShippingPage } from '../pages/shipping/shipping_page';
import { WorkshopsPage } from '../pages/workshops/workshops_page';
import { PATH } from '../data/path';

function RoutingApp() {
  return (
    <Routes>
      <Route path={PATH.main} element={<MainPage />} />
      <Route path={PATH.login} element={<LoginPage />} />
      <Route path={PATH.register} element={<RegistrationPage />} />
      <Route path={PATH.basket} element={<BasketPage />} />
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
