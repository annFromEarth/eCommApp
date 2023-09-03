import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CountryEnum } from '../registrationForm/types';
import { CustomerService } from '../../services/customerService';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
} from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
import { Customer } from '../../pages/Profile/types';

interface IAddAddressInput {
  country: CountryEnum;
  postalCode: string;
  city: string;
  street: string;
}

export default function AddAddressForm({
  setCustomerDataProp,
}: {
  setCustomerDataProp: React.Dispatch<React.SetStateAction<Customer | null>>;
}) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');
  const [country, setCountry] = useState('');

  const form = useForm<IAddAddressInput>({
    mode: 'onChange',
    defaultValues: {
      country: 'UNDEFINED' as CountryEnum,
      postalCode: '',
      city: '',
      street: '',
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
            action: 'addAddress',
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
        alert(`Address Added !`);
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
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
      <FormGroup
        sx={{
          gap: '15px',
          marginBottom: '50px',
        }}
      >
        <Typography>New Address</Typography>

        <FormControl>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country"
            id="country"
            value={country}
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
          {...register('street', {
            required: PATTERNS.EMPTY.message,
            pattern: PATTERNS.STREET,
          })}
          error={!!errors.street}
          helperText={errors.street?.message}
        />
        <Button type="submit" variant="contained">
          save address
        </Button>
        <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
      </FormGroup>
    </form>
  );
}
