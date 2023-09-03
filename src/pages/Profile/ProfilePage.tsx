import { Box, useTheme, Typography, Button } from '@mui/material';
import { PAGES_TITLES } from '../../data/titles';
import { PATH } from '../../data/paths';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './profilePage.css';
import { Customer } from './types';
import { CustomerService } from '../../services/customerService';

import FirstNameForm from '../../components/profileUpdateForms/firstNameForm';
import LastNameForm from '../../components/profileUpdateForms/lastNameForm';
import BirthDateForm from '../../components/profileUpdateForms/birthDateForm';
import EmailForm from '../../components/profileUpdateForms/emailForm';
import ChangePasswordForm from '../../components/profileUpdateForms/changePasswordForm';
import ProfileAddressItem from './ProfileAddressItem';
import AddAddressForm from '../../components/profileUpdateForms/addAddressForm';

export function ProfilePage() {
  const plantsTheme = useTheme();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const fetchCustomerData = async (token: string) => {
    //Try/catch
    const customer = await CustomerService.getMe(token);
    setCustomerData(customer);
    sessionStorage.setItem('customerVersion', customer.version.toString());
  };

  const [editPersonalData, setEditPersonalData] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [viewAddresses, setViewAddresses] = useState<boolean>(false);
  const [addAddress, setAddAddress] = useState<boolean>(false);

  const toggleEditPersonalData = () => {
    setEditPersonalData((editMode) => !editMode);
  };
  const toggleEditPassword = () => {
    setEditPassword((editMode) => !editMode);
  };
  const toggleViewAddresses = () => {
    setViewAddresses((viewAddresses) => !viewAddresses);
  };
  const toggleAddAddress = () => {
    setAddAddress((addAddress) => !addAddress);
  };

  useEffect(() => {
    const authorizationToken: string = sessionStorage.getItem('authorization-token')!;
    if (!authorizationToken) {
      navigate(PATH.login);
    }
    fetchCustomerData(authorizationToken);
  }, [navigate]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {PAGES_TITLES.profile}
        </Typography>
        <Box className="container">
          <Typography variant="h5" component="h5" gutterBottom>
            Personal Data
          </Typography>
          <Button variant="contained" onClick={toggleEditPersonalData}>
            {!editPersonalData && 'edit'}
            {editPersonalData && 'return'}
          </Button>
          {!editPersonalData && (
            <>
              <p>First Name: {customerData ? customerData.firstName : ''}</p>
              <p>Last Name: {customerData ? customerData.lastName : ''}</p>
              <p>Date of Birth: {customerData ? customerData.dateOfBirth : ''}</p>
              <p>Email: {customerData ? customerData.email : ''}</p>
            </>
          )}
          {editPersonalData && (
            <Box className="margined">
              <FirstNameForm setCustomerDataProp={setCustomerData} />
              <LastNameForm setCustomerDataProp={setCustomerData} />
              <BirthDateForm setCustomerDataProp={setCustomerData} />
              <EmailForm setCustomerDataProp={setCustomerData} />
            </Box>
          )}
        </Box>
        <Box className="container">
          <Typography variant="h5" component="h5" gutterBottom>
            Addresses
          </Typography>
          <Box>
            <Button sx={{ margin: '5px' }} variant="contained" onClick={toggleViewAddresses}>
              {!viewAddresses && 'view addresses'}
              {viewAddresses && 'hide addresses'}
            </Button>
            {viewAddresses &&
              customerData?.addresses.map((address, index) => (
                <ProfileAddressItem
                  key={address.id}
                  address={address}
                  index={index}
                  defaultShippingAddressId={customerData.defaultShippingAddressId}
                  defaultBillingAddressId={customerData.defaultBillingAddressId}
                  setCustomerDataProp={setCustomerData}
                />
              ))}
          </Box>
          <Box>
            <Button sx={{ margin: '5px' }} variant="contained" onClick={toggleAddAddress}>
              {!addAddress && 'add new address'}
              {addAddress && 'hide'}
            </Button>
            {addAddress && <AddAddressForm setCustomerDataProp={setCustomerData} />}
          </Box>
        </Box>
        <Box className="container">
          <Typography variant="h5" component="h5" gutterBottom>
            Password
          </Typography>
          <Button variant="contained" onClick={toggleEditPassword}>
            {!editPassword && 'change password'}
            {editPassword && 'return'}
          </Button>
          {editPassword && (
            <Box className="margined">
              <ChangePasswordForm setCustomerDataProp={setCustomerData} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
