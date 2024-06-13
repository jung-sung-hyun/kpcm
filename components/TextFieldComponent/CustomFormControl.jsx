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

const handleEmailBlur = async (email, setEmailLoading, setEmailValid) => {
  if (!email) return;

  console.log("email 유효성검증 start!", email);
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
      {email && emailLoading && (
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

export default CustomFormControl;