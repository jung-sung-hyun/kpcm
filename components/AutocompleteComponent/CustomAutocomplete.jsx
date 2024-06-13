import { useState, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextField from '../TextFieldComponent/CustomTextField'; // 경로는 실제 파일 위치에 따라 조정하세요
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

/**
 * @description: 입력 값의 유효성을 검사하는 함수
 * @function validateInput
 * @param {any} value - 현재 입력 값
 * @returns {boolean} - 입력 값이 유효한지 여부
 */
const validateInput = (value) => {
  // 여기에 유효성 검사를 위한 논리를 추가합니다.
  // 예시로, 입력 값이 비어있지 않아야 한다는 검사를 추가합니다.
  return value !== null && value !== '';
};

/**
 * @description: 입력 값의 유효성 상태에 따라 도움말 텍스트를 표시하는 컴포넌트
 * @function MyFormHelperText
 * @param {boolean} isValid - 입력 값이 유효한지 여부
 * @param {boolean} loading - 로딩 상태
 * @param {any} value - 현재 입력 값
 * @returns {JSX.Element} - 유효성 검사 결과에 따른 도움말 텍스트
 */
const MyFormHelperText = ({ isValid, loading, value }) => {
  const helperText = useMemo(() => {
    if (loading) {
      return '검증 중...';
    }
    if (!isValid) {
      return '유효한 값을 입력해야 합니다.';
    }
    return '';
  }, [isValid, loading, value]);

  return <FormHelperText error={!isValid}>{helperText}</FormHelperText>;
};

/**
 * @description: 커스텀 자동 완성 컴포넌트
 * @function CustomAutocomplete
 * @param {array} options - 자동 완성 옵션 배열
 * @param {any} value - 현재 선택된 값
 * @param {function} onChange - 값이 변경될 때 호출되는 함수
 * @param {string} label - 입력 필드의 레이블
 * @param {object} props - 추가적인 속성
 * @returns {JSX.Element} - 커스텀 자동 완성 컴포넌트
 */
const CustomAutocomplete = ({ options, value, onChange, label, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event, newValue) => {
    setLoading(true);
    onChange(event, newValue);

    setTimeout(() => {
      const valid = validateInput(newValue);
      setIsValid(valid);
      setLoading(false);
    }, 1000); // 유효성 검사를 1초 동안 시뮬레이션
  };

  return (
    <div>
      <Autocomplete
        options={options}
        value={value}
        onChange={handleChange}
        popupIcon={<SearchIcon />}
        renderInput={(params) => (
          <CustomTextField {...params} label={label} variant="outlined" fullWidth />
        )}
        {...props}
      />
      <MyFormHelperText isValid={isValid} loading={loading} value={value} />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'left', ml: 1, mt: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" sx={{ ml: 1, color: '#2196f3' }}>
            Verification
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CustomAutocomplete;