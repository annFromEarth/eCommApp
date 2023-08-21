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
import { DetailsType } from './login.types';
import { PATH } from '../../data/PATH';

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
  }, []);

  function encodeLoginRequestBody() {
    const details: DetailsType = {
      grant_type: 'password',
      username: email,
      password: password,
    };

    const formBody: string[] = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property as keyof typeof details]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  async function loginUser() {
    const response = await fetch(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerceapp_951/customers/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic N29zbFJYLVN3dUVPWWsycERSeHdTSS1wOmRXX0Q1eGNRU004WC1lbHRxUXFyMHp1bVRQUGo4QVlt',
        },
        body: encodeLoginRequestBody(),
      }
    );
    const data = await response.json();
    return data;
  }

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      loginUser().then((response) => {
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
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (passwordString: string) => {
    return String(passwordString).match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
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
