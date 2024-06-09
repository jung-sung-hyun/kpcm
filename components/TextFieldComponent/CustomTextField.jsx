import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    fullWidth
  />
);

export default CustomTextField;