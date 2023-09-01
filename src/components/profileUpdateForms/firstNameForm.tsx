import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import { TextField, Button, Box } from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
// import { Customer } from '../../pages/Profile/types';

interface IFirstNameInput {
  firstName: string;
}

export default function FirstNameForm({ setCustomerDataProp }) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const form = useForm<IFirstNameInput>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const onSubmit: SubmitHandler<IFirstNameInput> = async (data) => {
    try {
      const result = await CustomerService.updateMe(authorizationToken, version, [
        {
          action: 'setFirstName',
          firstName: data.firstName,
        },
      ]);

      sessionStorage.setItem('customerVersion', result.version.toString());
      setCustomerDataProp(result);
      alert(`First Name updated to ${result.firstName}!`);
      return result;
    } catch (err) {
      const error = err as Error;
      setErrorUpdate(error.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
      <TextField
        id="firstName"
        label="FirstName"
        variant="outlined"
        {...register('firstName', {
          required: 'This field is required',
          pattern: PATTERNS.FIRST_NAME,
        })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <Button type="submit" variant="contained">
        save
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
