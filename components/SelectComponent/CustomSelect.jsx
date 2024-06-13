import { useState, useMemo } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * @description: 선택된 옵션이 유효한지 확인하는 함수
 * @function validateSelection
 * @param {array} selectedOptions - 선택된 옵션 배열
 * @returns {boolean} - 선택된 옵션이 유효한지 여부
 */
const validateSelection = (selectedOptions) => {
  // 여기에 유효성 검사를 위한 논리를 추가합니다.
  // 예시로, 선택된 옵션의 수가 최소 1개 이상이어야 한다는 검사를 추가합니다.
  return selectedOptions.length > 0;
};

/**
 * @description: 선택된 옵션이 유효한지에 따라 도움말 텍스트를 표시하는 컴포넌트
 * @function MyFormHelperText
 * @param {boolean} isValid - 선택된 옵션이 유효한지 여부
 * @param {boolean} loading - 로딩 상태
 * @param {array} selectedOptions - 선택된 옵션 배열
 * @returns {JSX.Element} - 유효성 검사 결과에 따른 도움말 텍스트
 */
const MyFormHelperText = ({ isValid, loading, selectedOptions }) => {
  const helperText = useMemo(() => {
    if (loading) {
      return '검증 중...';
    }
    if (!isValid) {
      return '하나 이상의 옵션을 선택해야 합니다.';
    }
    return '';
  }, [isValid, loading, selectedOptions]);

  return <FormHelperText error={!isValid}>{helperText}</FormHelperText>;
};

/**
 * @description: 커스텀 다중 선택 체크박스 컴포넌트
 * @function CustomSelect
 * @param {string} label - 선택 항목의 레이블
 * @param {array} options - 선택할 옵션 배열
 * @param {array} selectedOptions - 선택된 옵션 배열
 * @param {function} setSelectedOptions - 선택된 옵션 배열을 설정하는 함수
 * @param {number} width - 컴포넌트의 너비 (기본값: 300)
 * @returns {JSX.Element} - 커스텀 다중 선택 체크박스 컴포넌트
 */
const CustomSelect = ({ label, options, selectedOptions, setSelectedOptions, width = 300 }) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setSelectedOptions(newValue);

    // 유효성 검사 시작
    setLoading(true);
    setTimeout(() => {
      const valid = validateSelection(newValue);
      setIsValid(valid);
      setLoading(false);
    }, 1000); // 유효성 검사를 1초 동안 시뮬레이션
  };

  return (
    <FormControl sx={{ m: 1, width }} error={!isValid}>
      <InputLabel id="custom-multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="custom-multiple-checkbox-label"
        id="custom-multiple-checkbox"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
      <MyFormHelperText isValid={isValid} loading={loading} selectedOptions={selectedOptions} />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'left', ml: 1, mt: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" sx={{ ml: 1, color: '#2196f3' }}>
            Verification
          </Typography>
        </Box>
      )}
    </FormControl>
  );
};

export default CustomSelect;