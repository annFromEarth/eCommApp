import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
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
// import { PATH } from '../../data/PATH';
import { PATTERNS } from './validation-constants';

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState<boolean>(false);
  const validateFirstName = (firstName: string) => {
    return String(firstName).match(PATTERNS.FIRST_NAME.value);
  };

  const [lastName, setLastName] = useState<string>('');
  const [isLastNameEmpty, setIsLastNameEmpty] = useState<boolean>(false);
  const validateLastName = (lastName: string) => {
    return String(lastName).match(PATTERNS.LAST_NAME.value);
  };

  const [email, setEmail] = useState<string>('');
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(false);
  const validateEmail = (mail: string) => {
    return String(mail).toLowerCase().match(PATTERNS.EMAIL.value);
  };

  const [password, setPassword] = useState<string>('');
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);
  const validatePassword = (passwordString: string) => {
    return String(passwordString).match(PATTERNS.PASSWORD.value);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [errorRegister, setErrorRegister] = useState<string>('');

  //   const navigate = useNavigate();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password) && !isEmailEmpty && !isPasswordEmpty) {
      //   registerUser(email, password).then((response) => {
      //     if (response.statusCode === 400) {
      //       setErrorRegister(response.message);
      //     } else if (response.access_token) {
      //       sessionStorage.setItem('authorization-token', response.access_token);
      //       navigate(PATH.main);
      //     }
      //   });
    }
  };

  return (
    <form style={{ width: '340px' }}>
      <FormGroup
        sx={{
          gap: '15px',
          marginBottom: '50px',
        }}
      >
        <TextField
          error={(firstName !== '' && !validateFirstName(firstName)) || isFirstNameEmpty}
          id="outlined-basic"
          label="FirstName"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            errorRegister !== '' && setErrorRegister('');
            setFirstName(event.target.value);
            event.target.value === '' ? setIsFirstNameEmpty(true) : setIsFirstNameEmpty(false);
          }}
          helperText={
            (firstName !== '' && !validateFirstName(firstName) && PATTERNS.FIRST_NAME.message) ||
            (isFirstNameEmpty && PATTERNS.EMPTY.message)
          }
        />
        <TextField
          error={(lastName !== '' && !validateLastName(lastName)) || isLastNameEmpty}
          id="outlined-basic"
          label="LastName"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            errorRegister !== '' && setErrorRegister('');
            setLastName(event.target.value);
            event.target.value === '' ? setIsLastNameEmpty(true) : setIsLastNameEmpty(false);
          }}
          helperText={
            (lastName !== '' && !validateLastName(lastName) && PATTERNS.LAST_NAME.message) ||
            (isLastNameEmpty && PATTERNS.LAST_NAME.message)
          }
        />
        <TextField
          error={(email !== '' && !validateEmail(email)) || isEmailEmpty}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            errorRegister !== '' && setErrorRegister('');
            setEmail(event.target.value);
            event.target.value === '' ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
          }}
          helperText={
            (email !== '' && !validateEmail(email) && 'Please, enter valid email.') ||
            (isEmailEmpty && 'Email is required.')
          }
        />
        <TextField
          error={(password !== '' && !validatePassword(password)) || isPasswordEmpty}
          id="outlined-basic"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          helperText={
            (password !== '' &&
              !validatePassword(password) &&
              'Please, enter valid password. Use minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character') ||
            (isPasswordEmpty && 'Password is required')
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            errorRegister !== '' && setErrorRegister('');
            setPassword(event.target.value);
            event.target.value === '' ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
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

        <Button variant="contained" onClick={(e) => handleRegister(e)}>
          Register
        </Button>
        {errorRegister !== '' && (
          <Typography component="p" align="center" sx={{ color: '#d9432b', maxWidth: '340px' }}>
            {errorRegister}
          </Typography>
        )}
      </FormGroup>
    </form>
  );
}
