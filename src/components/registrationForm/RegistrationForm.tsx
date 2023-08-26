import { useRef, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

import { createCustomer } from '../../services/createCustomer';
import { loginUser } from '../loginForm/loginRequest';

import { PATTERNS } from './validationConstants';
import { IFormInput } from './types';
import calcDateXYearsAgo from '../../utils/calcDateXYearsAgo';
import { PATH } from '../../data/path';

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      dateOfBirth: '2009-09-09',
    },
  });

  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  const [creationResult, setCreationResult] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('authorization-token')) {
      navigate(PATH.main);
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    //TODO: add message on customer creation(?), add redirection and login on customer creation
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

      createCustomer(data).then((result) => {
        if (result.message) {
          setCreationResult(result.message);
        } else {
          setCreationResult(result);
          loginUser(data.email, data.password).then((response) => {
            if (response.access_token) {
              sessionStorage.setItem('authorization-token', response.access_token);
              navigate(PATH.main);
            }
          });
        }
      });
    } catch (e) {
      //TODO: add error handling
    }
  };

  return (
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 4,
        py: 6,
      }}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '50%', padding: '1em' }}>
        <label>
          First Name <br></br>
        </label>
        <input
          {...register('firstName', {
            required: 'This field is required',
            pattern: PATTERNS.FIRST_NAME,
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
            pattern: PATTERNS.LAST_NAME,
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
            pattern: PATTERNS.EMAIL,
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
            pattern: PATTERNS.PASSWORD,
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
            max: calcDateXYearsAgo(14),
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
        {/* //TODO: add handling multiple adresses to choose defaultBilling & Shipping */}
        <br></br>
        <label>Country</label>
        <select {...register('country', { required: 'This field is required' })}>
          <option value="UK">United Kingdom</option>
        </select>
        <br></br>
        <label>Street</label>
        <input
          {...register('street', {
            required: 'This field is required',
            pattern: PATTERNS.STREET,
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
            pattern: PATTERNS.CITY,
          })}
          placeholder="city"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.city?.message}
        </p>
        <label>Postal Code</label>
        <br></br>
        <Typography sx={{ fontStyle: 'italic', fontSize: '0.7em' }}>
          Five to seven alphanumeric characters (uppercase) separated by a space. Example: &apos;AA1
          1AA&apos; or &apos;AA11 1AA&apos;
        </Typography>
        <input
          {...register('postalCode', {
            required: 'This field is required',
            pattern: PATTERNS.POSTCODE,
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
      <p style={{ color: 'red', marginBottom: '10px' }}>{creationResult}</p>
    </Box>
  );
}
