import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateNTimePicker = ({ label }) => {

  const [value, setValue] = React.useState(dayjs('2022-04-07'));

  console.log(value)

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className='bg-white'
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>

  );
}
export default DateNTimePicker;