import { useForm, SubmitHandler } from 'react-hook-form';
import { Typography, createTheme, Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

import './registration-form.css';
import { Box } from '@mui/material';
import { red } from '@mui/material/colors';

enum CountryEnum {
  uk = 'United Kingdom',
  ie = 'Ireland',
}

interface IFormInput {
  firstName: string;
  lastName: string;
  eMail: string;
  password: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: CountryEnum;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
}

// const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const emailRegExpRFC =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const nameRegExp = /^[a-zA-Z]+$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log(errors);

  return (
    <Box
      sx={{
        marginTop: 8,
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: 2,
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
          {/* <span style={{ fontStyle: 'italic' }}>* letters only</span> */}
        </label>
        <input
          {...register('firstName', {
            required: 'This field is required',
            pattern: {
              value: nameRegExp,
              message: 'at least one letter, no numbers, no special characters',
            },
          })}
          placeholder="Pomona"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.firstName?.message}
        </p>

        <label>
          Last Name <br></br>
          {/* <span style={{ fontStyle: 'italic' }}>* letters only</span> */}
        </label>
        <input
          {...register('lastName', {
            required: 'This field is required',
            pattern: {
              value: nameRegExp,
              message: 'minimum one letter, no numbers, no special characters',
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
          {...register('eMail', {
            required: 'This field is required',
            pattern: { value: emailRegExpRFC, message: 'not a valid email' },
          })}
          placeholder="pomona_sprout@gmail.com"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.eMail?.message}
        </p>

        <label>
          Password<br></br>
          {/* <span style={{ fontStyle: 'italic' }}>
            <ul>
              <li>* minimum 8 characters</li>
              <li>* at least 1 uppercase letter</li>
              <li>* at least 1 lowercase letter</li>
              <li>* at least 1 number</li>
            </ul>
          </span> */}
        </label>
        <input
          {...register('password', {
            required: 'This field is required',
            pattern: {
              value: passwordRegExp,
              message:
                'minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number',
            },
          })}
          placeholder="****"
        />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.password?.message}
        </p>

        <label>
          Date of birth <br></br>
          <span style={{ fontStyle: 'italic' }}>(Date format: YYYY-MM-DD)</span>
        </label>
        <input {...register('dateOfBirth')} />
        <p style={{ fontSize: '0.8em', margin: '5px 0 10px 0', color: 'red' }}>
          {errors.dateOfBirth?.message}
        </p>

        <label>Address:</label>
        <br></br>

        <label>Street</label>
        <input {...register('street')} placeholder="street" />

        <label>City</label>
        <input {...register('city')} placeholder="city" />

        <label>Postal Code</label>
        <input {...register('postalCode')} placeholder="postal code" />

        <label>Country</label>
        <select {...register('country')}>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Ireland">Ireland</option>
        </select>
        <br></br>

        <input
          {...register('defaultShippingAddress')}
          style={{ display: 'inline', width: '10%' }}
          type="checkbox"
          id="defaultShippingAddress"
          name="defaultShippingAddress"
        />
        <label>Set as default shipping address</label>

        <br></br>

        <input
          {...register('defaultBillingAddress')}
          style={{ display: 'inline', width: '10%' }}
          type="checkbox"
          id="defaultBillingAddress"
          name="defaultBillingAddress"
        />
        <label style={{ display: 'inline' }}>Set as default billing address</label>

        <input type="submit" value="Submit" style={{ cursor: 'pointer' }} />
      </form>

      <Typography>
        Already have an account? <Link href="#">Login</Link>
      </Typography>
    </Box>
  );
}
