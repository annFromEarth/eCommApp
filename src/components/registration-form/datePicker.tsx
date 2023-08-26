// import React, { useRef, RefAttributes } from 'react';
// import { TextField } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

// type TRef = RefAttributes<HTMLDivElement>;

// const DatePicker = React.forwardRef(function DatePicker(
//   props: { error: boolean | undefined; helperText: string },
//   ref: TRef
// ) {
//   const [value, setValue] = React.useState(null);
//   const { error, helperText, ...rest } = props;
//   //   ref = useRef<HTMLDivElement>(null);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <MuiDatePicker
//         ref={ref}
//         label="Date desktop"
//         inputFormat="YYYY-MM-DD"
//         value={value}
//         onChange={(newVal) => setValue(newVal)}
//         renderInput={(params: object) => (
//           <TextField {...params} error={error} helperText={helperText} {...rest} />
//         )}
//       />
//     </LocalizationProvider>
//   );
// });

// export default DatePicker;
