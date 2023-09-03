import { useState } from 'react';
import { Address } from './types';
import { Button, Box } from '@mui/material';
import { Customer } from './types';
import ChangeAddressForm from '../../components/profileUpdateForms/changeAddressForm';
import { CustomerService } from '../../services/customerService';

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
      <p>Address {index + 1}</p>
      <p>Country: {address.country}</p>
      <p>Postal Code: {address.postalCode}</p>
      <p>City: {address.city}</p>
      <p>Street: {address.streetName}</p>
      {defaultShippingAddressId === address.id ? <p>✅ Default shipping address</p> : ''}
      {defaultBillingAddressId === address.id ? <p>✅ Default billing address</p> : ''}
      <Box>
        <Button variant="contained" onClick={toggleEditAddress}>
          {!showEditAddress && 'edit'}
          {showEditAddress && 'hide'}
        </Button>
        {showEditAddress && (
          <ChangeAddressForm setCustomerDataProp={setCustomerDataProp} address={address} />
        )}
      </Box>
      <Box>
        <Button onClick={makeDefaultShippingAddress} variant="contained">
          make default shipping address
        </Button>
      </Box>
      <Box>
        {' '}
        <Button onClick={makeDefaultBillingAddress} variant="contained">
          make default billing address
        </Button>
      </Box>
      <Box>
        <Button onClick={deleteAddress} variant="contained">
          delete
        </Button>
        {errorUpdate}
      </Box>
    </Box>
  );
}
