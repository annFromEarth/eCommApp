import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CustomerService } from '../../services/customerService';
import dayjs from 'dayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { Button, Box } from '@mui/material';
// import { Customer } from '../../pages/Profile/types';

interface IBirthDateInput {
  dateOfBirth: string;
}

export default function BirthDateForm({ setCustomerDataProp }) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const form = useForm<IBirthDateInput>({
    mode: 'onChange',
    defaultValues: {
      dateOfBirth: '',
    },
  });

  const { handleSubmit, control } = form;

  const authorizationToken = sessionStorage?.getItem('authorization-token');
  const version = Number(sessionStorage?.getItem('customerVersion'));

  const minAge = dayjs().subtract(14, 'year');
  const maxAge = dayjs().subtract(99, 'year');

  const onSubmit: SubmitHandler<IBirthDateInput> = async (data) => {
    if (data.dateOfBirth !== 'Invalid Date') {
      try {
        const result = await CustomerService.updateMe(authorizationToken, version, [
          {
            action: 'setDateOfBirth',
            dateOfBirth: data.dateOfBirth,
          },
        ]);

        sessionStorage.setItem('customerVersion', result.version.toString());
        setCustomerDataProp(result);
        alert(`Birth Date updated to ${result.dateOfBirth}!`);
        return result;
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '340px' }}>
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
      <Button type="submit" variant="contained">
        save
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
