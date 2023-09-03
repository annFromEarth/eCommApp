import { useState } from 'react';
import { Address } from './types';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { Customer } from './types';
import ChangeAddressForm from '../../components/profileUpdateForms/changeAddressForm';
import { CustomerService } from '../../services/customerService';
import {
  LocalShippingOutlined,
  ReceiptLongOutlined,
  ClearOutlined,
  EditOutlined,
  KeyboardReturnOutlined,
} from '@mui/icons-material';

export default function ProfileAddressItem({
  address,
  index,
  defaultShippingAddressId,
  defaultBillingAddressId,
  setCustomerDataProp,
}: {
  address: Address;
  index: number;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  setCustomerDataProp: React.Dispatch<React.SetStateAction<Customer | null>>;
}) {
  const [showEditAddress, setShowEditAddress] = useState(false);
  const toggleEditAddress = () => {
    setShowEditAddress((showEditAddress) => !showEditAddress);
  };

  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const makeDefaultBillingAddress = async () => {
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMe(authorizationToken, version, [
          {
            action: 'setDefaultBillingAddress',
            addressId: address.id,
          },
        ]);
        sessionStorage.setItem('customerVersion', result.version.toString());
        setCustomerDataProp(result);
        alert('Address added as Default Billing Address !');
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  const makeDefaultShippingAddress = async () => {
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMe(authorizationToken, version, [
          {
            action: 'setDefaultShippingAddress',
            addressId: address.id,
          },
        ]);
        sessionStorage.setItem('customerVersion', result.version.toString());
        setCustomerDataProp(result);
        alert('Address added as Default Shipping Address !');
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  const deleteAddress = async () => {
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMe(authorizationToken, version, [
          {
            action: 'removeAddress',
            addressId: address.id,
          },
        ]);
        sessionStorage.setItem('customerVersion', result.version.toString());
        setCustomerDataProp(result);
        alert(`Address Removed !`);
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  return (
    <Box className="addressItem" key={address.id}>
      <Typography variant="h6" component="h5" gutterBottom sx={{ padding: '15px' }}>
        Address {index + 1}
      </Typography>
      <p>Country: {address.country}</p>
      <p>Postal Code: {address.postalCode}</p>
      <p>City: {address.city}</p>
      <p>Street: {address.streetName}</p>
      {defaultShippingAddressId === address.id ? <p>✅ Default shipping address</p> : ''}
      {defaultBillingAddressId === address.id ? <p>✅ Default billing address</p> : ''}

      <Tooltip title="Set as Default Sipping Address">
        <Button sx={{ margin: '5px' }} onClick={makeDefaultShippingAddress} variant="contained">
          <LocalShippingOutlined />
        </Button>
      </Tooltip>

      <Tooltip title="Set as Default Billing Address">
        <Button sx={{ margin: '5px' }} onClick={makeDefaultBillingAddress} variant="contained">
          <ReceiptLongOutlined />
        </Button>
      </Tooltip>

      <Tooltip title="Edit Address">
        <Button sx={{ margin: '5px' }} variant="contained" onClick={toggleEditAddress}>
          {!showEditAddress && <EditOutlined />}
          {showEditAddress && <KeyboardReturnOutlined />}
        </Button>
      </Tooltip>
      {showEditAddress && (
        <ChangeAddressForm setCustomerDataProp={setCustomerDataProp} address={address} />
      )}

      <Tooltip title="Delete Address">
        <Button
          sx={{ margin: '5px', background: '#ff4646' }}
          onClick={deleteAddress}
          variant="contained"
        >
          <ClearOutlined />
        </Button>
      </Tooltip>
      {errorUpdate}
    </Box>
  );
}
