import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import { TextField, Button, Box } from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
// import { Customer } from '../../pages/Profile/types';

interface ILastNameInput {
  lastName: string;
}

export default function LastNameForm({ setCustomerDataProp }) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const form = useForm<ILastNameInput>({
    mode: 'onChange',
    defaultValues: {
      lastName: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const onSubmit: SubmitHandler<ILastNameInput> = async (data) => {
    try {
      const result = await CustomerService.updateMe(authorizationToken, version, [
        {
          action: 'setLastName',
          lastName: data.lastName,
        },
      ]);

      sessionStorage.setItem('customerVersion', result.version.toString());
      setCustomerDataProp(result);
      alert(`Last Name updated to ${result.lastName}!`);
      return result;
    } catch (err) {
      const error = err as Error;
      setErrorUpdate(error.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
      <TextField
        id="lastName"
        label="LastName"
        variant="outlined"
        {...register('lastName', {
          required: 'This field is required',
          pattern: PATTERNS.LAST_NAME,
        })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <Button type="submit" variant="contained">
        save
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
