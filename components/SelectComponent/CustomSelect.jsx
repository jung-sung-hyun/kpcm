import { Select, MenuItem } from '@mui/material';

const CustomSelect = ({ label, value, onChange, options, displayEmpty = false, fullWidth = false }) => {
  return (
    <Select
      label={label}
      value={value}
      onChange={onChange}
      displayEmpty={displayEmpty}
      fullWidth={fullWidth}
    >
      <MenuItem value="">
        <em>{label}</em>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;