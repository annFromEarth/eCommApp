import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CountryEnum } from '../registrationForm/types';
import { CustomerService } from '../../services/customerService';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
} from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
import { Customer, Address } from '../../pages/Profile/types';

interface IAddAddressInput {
  country: CountryEnum;
  postalCode: string;
  city: string;
  street: string;
}

export default function ChangeAddressForm({
  setCustomerDataProp,
  address,
}: {
  setCustomerDataProp: React.Dispatch<React.SetStateAction<Customer | null>>;
  address: Address;
}) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');
  const [country, setCountry] = useState('');

  const form = useForm<IAddAddressInput>({
    mode: 'onChange',
    defaultValues: {
      country: address.country as CountryEnum,
      postalCode: address.postalCode,
      city: address.city,
      street: address.streetName,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  const onSubmit: SubmitHandler<IAddAddressInput> = async (data) => {
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMe(authorizationToken, version, [
          {
            action: 'changeAddress',
            addressId: address.id,
            address: {
              country: data.country,
              postalCode: data.postalCode,
              city: data.city,
              streetName: data.street,
            },
          },
        ]);

        sessionStorage.setItem('customerVersion', result.version.toString());
        setCustomerDataProp(result);
        alert(`Address Updated !`);
        return result;
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  useEffect(() => {
    reset({ country: 'UNDEFINED' as CountryEnum, postalCode: '', city: '', street: '' });
  }, [isSubmitSuccessful, reset]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '300px' }}>
      <FormGroup
        sx={{
          gap: '15px',
          marginBottom: '50px',
        }}
      >
        <FormControl>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country"
            id="country"
            value={country}
            placeholder={address.country}
            label="Country"
            {...register('country', { required: PATTERNS.EMPTY.message })}
            onChange={handleCountryChange}
          >
            <MenuItem value={'UK'}>UK</MenuItem>
            <MenuItem value={'FR'}>France</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          label="Postal Code"
          variant="outlined"
          placeholder={address.postalCode}
          {...register('postalCode', {
            required: PATTERNS.EMPTY.message,
            pattern: PATTERNS.POSTCODE,
          })}
          error={!!errors.postalCode}
          helperText={errors.postalCode?.message}
        />

        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          placeholder={address.city}
          {...register('city', {
            required: PATTERNS.EMPTY.message,
            pattern: PATTERNS.CITY,
          })}
          error={!!errors.city}
          helperText={errors.city?.message}
        />

        <TextField
          id="outlined-basic"
          label="Street"
          variant="outlined"
          placeholder={address.streetName}
          {...register('street', {
            required: PATTERNS.EMPTY.message,
            pattern: PATTERNS.STREET,
          })}
          error={!!errors.street}
          helperText={errors.street?.message}
        />
        <Button type="submit" variant="contained">
          update address
        </Button>
        <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
      </FormGroup>
    </form>
  );
}
