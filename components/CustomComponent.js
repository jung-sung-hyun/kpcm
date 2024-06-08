"use client";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';


export const CustomTextField = ({ label, value, onChange }) => (
  <TextField label={label} value={value} onChange={onChange} fullWidth />
);

export const CustomAutocomplete = ({ options, value, onChange, label }) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) => option.label}
    value={value}
    onChange={(event, newValue) => onChange(newValue)}
    renderInput={(params) => <TextField {...params} label={label} fullWidth />}
  />
);

export const CustomInputBox = ({ value, onChange }) => (
  <Input value={value} onChange={onChange} fullWidth />
);

export const CustomCheckbox = ({ label, checked, onChange }) => (
  <FormControlLabel
    control={<Checkbox checked={checked} onChange={onChange} />}
    label={label}
  />
);

// Custom Button
export const CustomButton = ({ label, onClick, variant = 'contained', color = 'primary' }) => (
  <Button variant={variant} color={color} onClick={onClick}>
    {label}
  </Button>
);

// Custom Radio Group
export const CustomRadioGroup = ({ options, value, onChange, label }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup value={value} onChange={onChange}>
      {options.map((option) => (
        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
      ))}
    </RadioGroup>
  </FormControl>
);

// Custom Select
export const CustomSelect = ({ options, value, onChange, label }) => (
  <FormControl fullWidth>
    <Select value={value} onChange={onChange} displayEmpty>
      <MenuItem value="">
        <em>{label}</em>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Custom Alert
export const CustomAlert = ({ severity, message }) => (
  <Alert severity={severity}>{message}</Alert>
);

// Custom Progress
export const CustomProgress = ({ color = 'primary' }) => (
  <CircularProgress color={color} />
);

export const CustomModal = ({ open, onClose, children, title }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {children}
      </Typography>
    </Box>
  </Modal>
);

// Custom Popover
export const CustomPopover = ({ open, anchorEl, onClose, title, children }) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {children}
    </Box>
  </Popover>
);
// "use client";

// import { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';

// const ComboBox = ({ label, options, defaultValue, onChange }) => {
//   const [value, setValue] = useState(defaultValue);

//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     setValue(newValue);
//     if (onChange) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <TextField
//       select
//       label={label}
//       value={value}
//       onChange={handleChange}
//       fullWidth
//     >
//       {options.map((option) => (
//         <MenuItem key={option.value} value={option.value}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </TextField>
//   );
// };

// export default ComboBox;

