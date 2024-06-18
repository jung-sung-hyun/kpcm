import React, { useState, useMemo, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormControl } from '@mui/material/FormControl';

/**
 * @description: 이메일 유효성 검증을 수행하는 함수
 * @function handleEmailBlur
 * @param {string} email - 검증할 이메일 주소
 * @param {function} setEmailLoading - 이메일 로딩 상태를 설정하는 함수
 * @param {function} setEmailValid - 이메일 유효성 상태를 설정하는 함수
 * @returns {void}
 */
const handleEmailBlur = async (email, setEmailLoading, setEmailValid) => {
  if (!email) return;

  setEmailLoading(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = emailRegex.test(email);

  setTimeout(() => {
    setEmailLoading(false);
    setEmailValid(isValid);
    if (isValid) {
      console.log("email 유효성검증 성공!", email);
    } else {
      console.log("email 유효성검증 실패!", email);
    }
  }, 1000);
};

/**
 * @description: 이메일 유효성 상태에 따라 도움말 텍스트를 표시하는 컴포넌트
 * @function MyFormHelperText
 * @param {boolean} isValid - 이메일 유효성 상태
 * @param {boolean} emailLoading - 이메일 로딩 상태
 * @param {string} email - 현재 이메일 값
 * @returns {JSX.Element} - 이메일 유효성 검증 결과에 따른 도움말 텍스트
 */
const MyFormHelperText = ({ isValid, emailLoading, email }) => {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (!email || emailLoading) {
      return null;
    }
    if (!isValid) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    return '';
  }, [isValid, emailLoading, email]);

  return <FormHelperText error={!isValid}>{helperText}</FormHelperText>;
};

/**
 * @description: 커스텀 FormControl 컴포넌트
 * @function CustomFormControl
 * @param {string} email - 현재 이메일 값
 * @param {function} setEmail - 이메일 값을 설정하는 함수
 * @param {boolean} emailValid - 이메일 유효성 상태
 * @param {function} setEmailValid - 이메일 유효성 상태를 설정하는 함수
 * @param {boolean} emailLoading - 이메일 로딩 상태
 * @param {function} setEmailLoading - 이메일 로딩 상태를 설정하는 함수
 * @param {object} emailRef - 이메일 input의 참조 객체
 * @returns {JSX.Element} - 커스텀 FormControl 컴포넌트
 */
const CustomFormControl = ({
  email,
  setEmail,
  emailValid,
  setEmailValid,
  emailLoading,
  setEmailLoading,
  emailRef
}) => {
  return (
    <FormControl fullWidth margin="normal" variant="outlined" error={!!email && !emailValid}>
      <OutlinedInput
        type="email"
        value={email}
        inputRef={emailRef}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleEmailBlur(email, setEmailLoading, setEmailValid)}
        placeholder="이메일"
        endAdornment={
          <InputAdornment position="end">
            {!emailLoading && email && emailValid && (
              <CheckCircleOutlineIcon sx={{ color: 'green' }} />
            )}
          </InputAdornment>
        }
      />
      <MyFormHelperText isValid={emailValid} emailLoading={emailLoading} email={email} />
      <Box sx={{ display: 'flex', justifyContent: 'left', ml: 1, mt: 1, height: 6 }}>
        {email && emailLoading ? (
          <>
            <CircularProgress size={16} />
            <Typography variant="body2" sx={{ ml: 1, color: '#2196f3' }}>
              Verification
            </Typography>
          </>
        ) : null}
      </Box>
    </FormControl>
  );
};

export default CustomFormControl;