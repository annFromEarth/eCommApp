import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import { TextField, Button, Box } from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
// import { Customer } from '../../pages/Profile/types';

interface IEmailInput {
  email: string;
}

export default function EmailForm({ setCustomerDataProp }) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const form = useForm<IEmailInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const onSubmit: SubmitHandler<IEmailInput> = async (data) => {
    try {
      const result = await CustomerService.updateMe(authorizationToken, version, [
        {
          action: 'changeEmail',
          email: data.email,
        },
      ]);

      sessionStorage.setItem('customerVersion', result.version.toString());
      setCustomerDataProp(result);
      alert(`Email updated to ${result.email}!`);
      return result;
    } catch (err) {
      const error = err as Error;
      setErrorUpdate(error.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        {...register('email', {
          required: 'This field is required',
          pattern: PATTERNS.EMAIL,
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained">
        save
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
