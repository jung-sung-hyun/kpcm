import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextField from '../TextFieldComponent/CustomTextField'; // 경로는 실제 파일 위치에 따라 조정하세요

const CustomAutocomplete = ({ options, value, onChange, label, ...props }) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={onChange}
      popupIcon={<SearchIcon />}
      renderInput={(params) => (
        <CustomTextField {...params} label={label} variant="outlined" fullWidth />
      )}
      {...props}
    />
  );
};

export default CustomAutocomplete;