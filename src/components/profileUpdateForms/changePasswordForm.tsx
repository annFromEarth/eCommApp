import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import { TextField, Button, Box, InputAdornment, IconButton, FormGroup } from '@mui/material';
import { PATTERNS } from '../registrationForm/validationConstants';
import { loginUser } from '../loginForm/loginRequest';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Customer } from '../../pages/Profile/types';

interface IChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export default function ChangePasswordForm({ setCustomerDataProp }) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const form = useForm<IChangePasswordInput>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const onSubmit: SubmitHandler<IChangePasswordInput> = async (data) => {
    try {
      const result = await CustomerService.changePasswordMe(
        authorizationToken,
        version,
        data.currentPassword,
        data.newPassword
      );

      if (result.statusCode === 400) {
        setErrorUpdate(result.message);
      } else {
        sessionStorage.setItem('customerVersion', result.version.toString());
        setCustomerDataProp(result);
        alert(`Password Updated Successfully`);
        const renewLogin = await loginUser(result.email, data.newPassword);
        sessionStorage.setItem('authorization-token', renewLogin.access_token);
      }
      return result;
    } catch (err) {
      const error = err as Error;
      setErrorUpdate(error.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
      <FormGroup
        sx={{
          gap: '15px',
          marginBottom: '50px',
        }}
      >
        <TextField
          type={showNewPassword ? 'text' : 'password'}
          label="New Password"
          variant="outlined"
          {...register('newPassword', {
            required: 'This field is required',
            pattern: PATTERNS.PASSWORD,
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type={showCurrentPassword ? 'text' : 'password'}
          label="Current Password"
          variant="outlined"
          {...register('currentPassword', {
            required: 'This field is required',
            pattern: PATTERNS.PASSWORD,
          })}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCurrentPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" variant="contained">
          change password
        </Button>
        <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
      </FormGroup>
    </form>
  );
}
