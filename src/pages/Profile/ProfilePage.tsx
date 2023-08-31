import { Box, useTheme, Typography, Button } from '@mui/material';
import { PAGES_TITLES } from '../../data/titles';
import { PATH } from '../../data/paths';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './profilePage.css';
import { Customer } from './types';
import { CustomerService } from '../../services/customerService';

export function ProfilePage() {
  const plantsTheme = useTheme();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState<Customer | null>(null);

  const [editPersonalData, setEditPersonalData] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editAddresses, setEditAddresses] = useState<boolean>(false);

  const toggleEditPersonalData = () => {
    setEditPersonalData((editMode) => !editMode);
  };

  const toggleEditPassword = () => {
    setEditPassword((editMode) => !editMode);
  };

  const toggleEditAddresses = () => {
    setEditAddresses((editMode) => !editMode);
  };

  const fetchCustomerData = async (token: string) => {
    //Try/catch
    const customer = await CustomerService.getMe(token);
    setCustomerData(customer);
  };

  const arrayAddresses = customerData?.addresses.map((address, index) => (
    <li className="addressItem" key={address.id}>
      <p>Address {index + 1}</p>
      <p>Country: {address.country}</p>
      <p>Postal Code: {address.postalCode}</p>
      <p>City: {address.city}</p>
      <p>Street: {address.streetName}</p>
      {customerData.defaultShippingAddressId === address.id ? (
        <p>✅ Default shipping address</p>
      ) : (
        ''
      )}
      {customerData.defaultBillingAddressId === address.id ? <p>✅ Default billing address</p> : ''}
    </li>
  ));

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
          {editPersonalData && <>Editing</>}
        </Box>
        <Box className="container">
          <Typography variant="h5" component="h5" gutterBottom>
            Addresses
          </Typography>
          <Button variant="contained" onClick={toggleEditAddresses}>
            {!editAddresses && 'edit'}
            {editAddresses && 'return'}
          </Button>
          {!editAddresses && <ul>{arrayAddresses}</ul>}
          {editAddresses && <>Editing</>}
        </Box>
        <Box className="container">
          <Typography variant="h5" component="h5" gutterBottom>
            Password
          </Typography>
          <Button variant="contained" onClick={toggleEditPassword}>
            {!editPassword && 'change password'}
            {editPassword && 'return'}
          </Button>
          {editPassword && <>Editing</>}
        </Box>
      </Box>
    </>
  );
}
