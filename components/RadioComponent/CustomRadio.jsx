import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CustomRadioGroup = ({ label, options, row = true, name }) => {
  return (
    <FormControl>
      <FormLabel id={`${name}-radio-buttons-group-label`}>{label}</FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby={`${name}-radio-buttons-group-label`}
        name={name}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled || false}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;