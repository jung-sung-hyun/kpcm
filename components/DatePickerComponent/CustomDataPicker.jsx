import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker = ({ label, defaultValue, controlled = false }) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        {controlled ? (
          <DatePicker
            label={label}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        ) : (
          <DatePicker label={label} defaultValue={defaultValue} />
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;