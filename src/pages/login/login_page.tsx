import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  createTheme,
  Typography,
  TextField,
  FormGroup,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import { PagesTitles } from '../../data/TITLES';
import { PATH } from '../../data/PATH';
import { DetailsType } from './login.types';

const plantsTheme = createTheme(themeOptions);

export function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    loginUser().then((response) => {
      if (response.statusCode === 400) {
        alert(response.message);
      } else if (response.access_token) {
        navigate(PATH.main);
      }
    });
  };

  //   const validateEmail = (mail: string) => {
  //     return String(mail)
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       );
  //   };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {PagesTitles.login}
        </Typography>
        <form>
          <FormGroup
            sx={{
              gap: '15px',
              marginBottom: '50px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
            <TextField
              id="outlined-basic"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
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
          </FormGroup>
        </form>
        <RegisterLink />
      </Box>
    </>
  );
}

function RegisterLink() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          fontSize: '24px',
        }}
      >
        New here?
        <Box
          sx={{
            textDecoration: 'underline',
          }}
        >
          <Button variant="outlined">
            <Link to={PATH.register}>
              Create an account <span style={{ marginLeft: '15px' }}>&#10133;</span>
            </Link>
          </Button>
        </Box>
      </Box>
    </>
  );
}
