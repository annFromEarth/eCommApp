import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IFormInput, CountryEnum } from './types';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../services/createCustomer';
import { loginUser } from '../loginForm/loginRequest';

import {
  Typography,
  TextField,
  FormGroup,
  IconButton,
  InputAdornment,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { PATH } from '../../services/routing/paths';
import { PATTERNS } from './validationConstants';

export default function RegistrationForm() {
  const minAge = dayjs().subtract(14, 'year');
  const maxAge = dayjs().subtract(99, 'year');

  const plantsTheme = useTheme();

  const form = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      addresses: [],
      countryPrimary: 'UNDEFINED' as CountryEnum,
      postalCodePrimary: '',
      cityPrimary: '',
      streetPrimary: '',
      countrySecondary: 'UNDEFINED' as CountryEnum,
      postalCodeSecondary: '',
      citySecondary: '',
      streetSecondary: '',
      defaultShippingAddress: 0,
    },
  });

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
    control,
  } = form;

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('authorization-token')) {
      navigate(PATH.main);
    }
  }, [navigate]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [countryPrimary, setCountryPrimary] = useState('');
  const handleCountryPrimaryChange = (event: SelectChangeEvent) => {
    setCountryPrimary(event.target.value);
  };

  const [countrySecondary, setCountrySecondary] = useState('');
  const handleCountrySecondaryChange = (event: SelectChangeEvent) => {
    setCountrySecondary(event.target.value);
  };

  const [creationResult, setCreationResult] = useState('');

  const [uniteBillingAddress, setUniteBillingAddress] = useState(false);
  const handleUniteBillingAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniteBillingAddress(event.target.checked);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    //TODO: add message on customer creation(?), proper date validation
    if (data.dateOfBirth !== 'Invalid Date') {
      try {
        data.addresses = [
          {
            country: data.countryPrimary,
            postalCode: data.postalCodePrimary,
            streetName: data.streetPrimary,
            city: data.cityPrimary,
          },
          {
            country: data.countrySecondary,
            postalCode: data.postalCodeSecondary,
            streetName: data.streetSecondary,
            city: data.citySecondary,
          },
        ];

        uniteBillingAddress ? (data.defaultBillingAddress = 0) : (data.defaultBillingAddress = 1);

        // console.log(data.dateOfBirth);
        // console.log(data.countryPrimary);
        // console.log(data.countrySecondary);
        // console.log(data.defaultShippingAddress);
        // console.log(data.defaultBillingAddress);

        createCustomer(data).then((result) => {
          if (result.message) {
            setCreationResult(result.message);
          } else {
            setCreationResult(result);
            alert(result);
            loginUser(data.email, data.password).then((response) => {
              if (response.access_token) {
                sessionStorage.setItem('authorization-token', response.access_token);
                navigate(PATH.main);
              }
            });
          }
        });
      } catch (e) {
        //TODO: error handling
      }
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
        <FormGroup
          sx={{
            gap: '15px',
            marginBottom: '50px',
          }}
        >
          <TextField
            id="outlined-basic"
            label="FirstName"
            variant="outlined"
            {...register('firstName', {
              required: 'This field is required',
              pattern: PATTERNS.FIRST_NAME,
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            id="outlined-basic"
            label="LastName"
            variant="outlined"
            {...register('lastName', {
              required: 'This field is required',
              pattern: PATTERNS.LAST_NAME,
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...register('email', {
              required: 'This field is required',
              pattern: PATTERNS.EMAIL,
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            id="outlined-basic"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            {...register('password', {
              required: 'This field is required',
              pattern: PATTERNS.PASSWORD,
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
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

          <Controller
            control={control}
            rules={{
              required: 'This field is required',
              max: {
                value: minAge.toString(),
                message: 'Invalid age. You have to be between 14 and 99 years old.',
              },
              min: {
                value: maxAge.toString(),
                message: 'Invalid age. You have to be between 14 and 99 years old.',
              },
            }}
            name="dateOfBirth"
            render={({ field: { onChange: rhfOnChange, ref }, fieldState: { error } }) => (
              <>
                <MuiDatePicker
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                    },
                  }}
                  minDate={maxAge}
                  maxDate={minAge}
                  format="YYYY-MM-DD"
                  onChange={(date) => {
                    if (date) {
                      rhfOnChange(date.format('YYYY-MM-DD'));
                      // console.log(date.format('YYYY-MM-DD'));
                    }
                  }}
                  ref={ref}
                />
                {error && <div>error.message</div>}
              </>
            )}
          />

          {/* <MuiDatePicker
            {...(register('dateOfBirth'),
            {
              max: minAge.toString(),
              min: maxAge.toString(),
              pattern: /^\d{4}-\d{2}-\d{2}$/,
            })}
            onError={() =>
              setError('dateOfBirth', {
                type: 'manual',
                message: 'Invalid age. You have to be between 14 and 99 years old.',
              })
            }
            slotProps={{
              textField: {
                helperText: errors.dateOfBirth?.message,
              },
            }}
            minDate={maxAge}
            maxDate={minAge}
            format="YYYY-MM-DD"
            onChange={(date) => {
              console.log(date.format('YYYY-MM-DD'));
              if (date) form.setValue('dateOfBirth', date.format('YYYY-MM-DD'));
            }}
          /> */}

          <>
            <Typography>Shipping Address</Typography>

            <FormControl>
              <InputLabel id="countryPrimary">Country</InputLabel>
              <Select
                labelId="countryPrimary"
                id="countryPrimary"
                value={countryPrimary}
                label="Country"
                {...register('countryPrimary', { required: PATTERNS.EMPTY.message })}
                onChange={handleCountryPrimaryChange}
              >
                <MenuItem value={'UK'}>UK</MenuItem>
                <MenuItem value={'FR'}>France</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              {...register('postalCodePrimary', {
                required: PATTERNS.EMPTY.message,
                pattern: PATTERNS.POSTCODE,
              })}
              error={!!errors.postalCodePrimary}
              helperText={errors.postalCodePrimary?.message}
            />

            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              {...register('cityPrimary', {
                required: PATTERNS.EMPTY.message,
                pattern: PATTERNS.CITY,
              })}
              error={!!errors.cityPrimary}
              helperText={errors.cityPrimary?.message}
            />

            <TextField
              id="outlined-basic"
              label="Street"
              variant="outlined"
              {...register('streetPrimary', {
                required: PATTERNS.EMPTY.message,
                pattern: PATTERNS.STREET,
              })}
              error={!!errors.streetPrimary}
              helperText={errors.streetPrimary?.message}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={uniteBillingAddress}
                  onChange={handleUniteBillingAddressChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={
                <Typography style={{ color: plantsTheme.palette.text.primary }}>
                  Set as default billing address
                </Typography>
              }
            />
          </>

          {uniteBillingAddress ? (
            <></>
          ) : (
            <>
              <Typography>Billing Address</Typography>
              <FormControl>
                <InputLabel id="countrySecondary">Country</InputLabel>
                <Select
                  labelId="countrySecondary"
                  id="countrySecondary"
                  value={countrySecondary}
                  label="Country"
                  {...register('countrySecondary', { required: PATTERNS.EMPTY.message })}
                  onChange={handleCountrySecondaryChange}
                >
                  <MenuItem value={'UK'}>UK</MenuItem>
                  <MenuItem value={'FR'}>France</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Postal Code"
                variant="outlined"
                {...register('postalCodeSecondary', {
                  required: PATTERNS.EMPTY.message,
                  pattern: PATTERNS.POSTCODE,
                })}
                error={!!errors.postalCodeSecondary}
                helperText={errors.postalCodeSecondary?.message}
              />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                {...register('citySecondary', {
                  required: PATTERNS.EMPTY.message,
                  pattern: PATTERNS.CITY,
                })}
                error={!!errors.citySecondary}
                helperText={errors.citySecondary?.message}
              />
              <TextField
                id="outlined-basic"
                label="Street"
                variant="outlined"
                {...register('streetSecondary', {
                  required: PATTERNS.EMPTY.message,
                  pattern: PATTERNS.STREET,
                })}
                error={!!errors.streetSecondary}
                helperText={errors.streetSecondary?.message}
              />
            </>
          )}

          <Button type="submit" variant="contained">
            Register
          </Button>

          <Typography component="p" align="center" sx={{ color: '#d9432b', maxWidth: '340px' }}>
            {creationResult}
          </Typography>
        </FormGroup>
      </form>
    </>
  );
}
