import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  FormGroup,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { PATH } from '../../data/PATH';
import { emailRegExpRFC, passwordRegExp } from '../../utils/regexToValidate';
import { loginUser } from './login-request';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('authorization-token')) {
      navigate(PATH.main);
    }
  }); //,[])

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      loginUser(email, password).then((response) => {
        if (response.statusCode === 400) {
          setErrorLogin(response.message);
        } else if (response.access_token) {
          sessionStorage.setItem('authorization-token', response.access_token);
          navigate(PATH.main);
        }
      });
    }
  };

  const validateEmail = (mail: string) => {
    return String(mail).toLowerCase().match(emailRegExpRFC);
  };
  const validatePassword = (passwordString: string) => {
    return String(passwordString).match(passwordRegExp);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form style={{ minWidth: '340px' }}>
      <FormGroup
        sx={{
          gap: '15px',
          marginBottom: '50px',
        }}
      >
        <TextField
          error={email !== '' && !validateEmail(email)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            errorLogin !== '' && setErrorLogin('');
            setEmail(event.target.value);
          }}
          helperText={email !== '' && !validateEmail(email) && 'Please, enter valid email'}
        />
        <TextField
          error={password !== '' && !validatePassword(password)}
          id="outlined-basic"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          helperText={
            password !== '' && !validatePassword(password) && 'Please, enter valid password'
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            errorLogin !== '' && setErrorLogin('');
            setPassword(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" onClick={(e) => handleLogin(e)}>
          Login
        </Button>
        {errorLogin !== '' && (
          <Typography component="p" align="center" sx={{ color: '#d9432b', maxWidth: '340px' }}>
            {errorLogin}
          </Typography>
        )}
      </FormGroup>
    </form>
  );
}
