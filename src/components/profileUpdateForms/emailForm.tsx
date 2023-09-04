import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import { TextField, Button, Box } from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
import { Customer } from '../../pages/Profile/types';
import SaveIcon from '@mui/icons-material/Save';

interface IEmailInput {
  email: string;
}

export default function EmailForm({
  setCustomerDataProp,
}: {
  setCustomerDataProp: React.Dispatch<React.SetStateAction<Customer | null>>;
}) {
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
    formState: { errors, isSubmitSuccessful },
    reset,
  } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const onSubmit: SubmitHandler<IEmailInput> = async (data) => {
    if (authorizationToken) {
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
    }
  };

  useEffect(() => {
    reset({ email: '' });
  }, [isSubmitSuccessful, reset]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '320px' }}>
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
      <Button sx={{ margin: '8px' }} type="submit" variant="contained">
        <SaveIcon />
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
