import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import { TextField, Button, Box } from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
import { Customer } from '../../pages/Profile/types';
import SaveIcon from '@mui/icons-material/Save';

interface IFirstNameInput {
  firstName: string;
}

export default function FirstNameForm({
  setCustomerDataProp,
}: {
  setCustomerDataProp: React.Dispatch<React.SetStateAction<Customer | null>>;
}) {
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
    formState: { errors, isSubmitSuccessful },
    reset,
  } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const onSubmit: SubmitHandler<IFirstNameInput> = async (data) => {
    if (authorizationToken) {
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
    }
  };

  useEffect(() => {
    reset({ firstName: '' });
  }, [isSubmitSuccessful, reset]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '320px' }}>
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
      <Button sx={{ margin: '8px' }} type="submit" variant="contained">
        <SaveIcon />
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
