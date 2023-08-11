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

function RoutingApp() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="/plants" element={<PlantsPage />} />
      <Route path="/workshops" element={<WorkshopsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/shipping" element={<ShippingPage />} />
      <Route path="/guarantee" element={<GuaranteePage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RoutingApp;