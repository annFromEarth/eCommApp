import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Typography, createTheme, Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { themeOptions } from '../../assets/theme1';

import { createCustomer } from '../../services/createCustomer';

import {
  emailRegExpRFC,
  nameRegExp,
  passwordRegExp,
  postcodeRegEx,
  streetRegEx,
  cityRegEx,
} from '../../utils/regexToValidate';

const plantsTheme = createTheme(themeOptions);

import './registration-form.css';
import { Box } from '@mui/material';

enum CountryEnum {
  uk = 'United Kingdom',
  fr = 'France',
}

type Address = {
  streetName: string;
  city: string;
  postalCode: string;
  country: CountryEnum;
};

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string | null;
  addresses: Address[];
  street: string;
  city: string;
  postalCode: string;
  country: CountryEnum;
  defaultAddress: '0' | '1';
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      data.addresses = [
        {
          country: data.country,
          postalCode: data.postalCode,
          streetName: data.street,
          city: data.city,
        },
      ];

      if (data.defaultAddress === '0') {
        data.defaultBillingAddress = Number('0');
        data.defaultShippingAddress = Number('0');
      }
      if (data.defaultAddress === '1') {
        data.defaultBillingAddress = undefined;
        data.defaultShippingAddress = undefined;
      }

      data.dateOfBirth = date;
      createCustomer(data);
      //   getBearerToken();
    } catch (e) {}
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 4,
        py: 6,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: plantsTheme.palette.background.default }}>FPH</Avatar>
      <Box>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
      </Box>

      <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '50%', padding: '1em' }}>
        <label>
          First Name <br></br>
        </label>
        <input
          {...register('firstName', {
            required: 'This field is required',
            pattern: {
              value: nameRegExp,
              message: 'At least one letter, no numbers, no special characters',
            },
          })}
          placeholder="Pomona"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.firstName?.message}
        </p>
        <label>
          Last Name <br></br>
        </label>
        <input
          {...register('lastName', {
            required: 'This field is required',
            pattern: {
              value: nameRegExp,
              message: 'Minimum one letter, no numbers, no special characters',
            },
          })}
          placeholder="Sprout"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.lastName?.message}
        </p>
        <label>
          Email<br></br>
        </label>
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: { value: emailRegExpRFC, message: 'not a valid email' },
          })}
          placeholder="pomona_sprout@gmail.com"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.email?.message}
        </p>
        <label>
          Password<br></br>
        </label>
        <input
          {...register('password', {
            required: 'This field is required',
            pattern: {
              value: passwordRegExp,
              message:
                'Password too weak. Please use minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number',
            },
          })}
          placeholder="****"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.password?.message}
        </p>
        <label>
          Date of birth <br></br>
        </label>
        <Typography sx={{ fontStyle: 'italic', fontSize: '0.7em' }}>
          You have to be minimum 14 years of age
        </Typography>
        <input
          {...(register('dateOfBirth'),
          {
            required: true,
            max: `${new Date(Date.now() - 441504000000).getFullYear()}-${(
              new Date(Date.now() - 441504000000).getMonth() + 1
            )
              .toString()
              .padStart(2, '0')}-${new Date(Date.now() - 441504000000)
              .getDate()
              .toString()
              .padStart(2, '0')}`,
            min: '1950-01-01',
          })}
          type="date"
          onChange={handleChange}
          ref={dateInputRef}
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.dateOfBirth?.message}
        </p>
        <label>Address:</label>
        <br></br>
        <label>Country</label>
        <select {...register('country', { required: 'This field is required' })}>
          <option value="UK">United Kingdom</option>
          <option value="FR">France</option>
        </select>
        <br></br>
        <label>Street</label>
        <input
          {...register('street', {
            required: 'This field is required',
            pattern: { value: streetRegEx, message: 'Not a valid street address' },
          })}
          placeholder="street"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.street?.message}
        </p>
        <label>City</label>
        <input
          {...register('city', {
            required: 'This field is required',
            pattern: {
              value: cityRegEx,
              message: 'Not a valid city name',
            },
          })}
          placeholder="city"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.city?.message}
        </p>
        <label>Postal Code</label>
        <br></br>
        <Typography sx={{ fontStyle: 'italic', fontSize: '0.7em' }}>
          Five to seven alphanumeric characters separated by a space. Example: &apos;AA1 1AA&apos;
          or &apos;AA11 1AA&apos;
        </Typography>
        <input
          {...register('postalCode', {
            required: 'This field is required',
            pattern: {
              value: postcodeRegEx,
              message:
                'Five to seven alphanumeric characters separated by a space. Example: "AA1 1AA" or "AA11 1AA"',
            },
          })}
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.postalCode?.message}
        </p>

        <label>Set as default address</label>
        <select {...register('defaultAddress')}>
          <option value="0">Yes</option>
          <option value="1">No</option>
        </select>
        <input type="submit" value="Submit" style={{ cursor: 'pointer' }} />
      </form>

      <Typography>
        Already have an account? <Link href="#">Login</Link>
      </Typography>
    </Box>
  );
}
