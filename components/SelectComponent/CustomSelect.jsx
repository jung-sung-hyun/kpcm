import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CustomSelect = ({ label, value, onChange, options, displayEmpty = false, fullWidth = false }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty={displayEmpty}
        label={label}
      >
        {displayEmpty && (
          <MenuItem value="">
            <em>선택</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;