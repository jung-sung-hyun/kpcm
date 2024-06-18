"use client";
import { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Grid, CircularProgress, Box, FormControl, OutlinedInput, FormHelperText, InputAdornment } from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContext';
import { fetcher } from '@apis/api';
import { useSearchParams } from "next/navigation";
import CustomMessageModal from '@components/ModalComponent/CustomMessageModal';
import CustomFormControl from '@components/TextFieldComponent/CustomFormControl';
import useAlert from '@hooks/useAlert';
import './common/(utils)/common';

/**
 * @description: 로그인을 위한 화면.
 * @function LoginPage
 * @param {string} email
 * @param {string} password
 * @returns
 * 변경이 있을 때에는 수정 이력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 * ========================================================================================================
 */

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectHash, setConnectHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true); 
  const emailRef = useRef(null);
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const searchParams = useSearchParams();
  const getConnectHash = searchParams.get('connectHash');
  const {
    openAlert,
    alertMessage,
    handleOpenAlert,
    handleCloseAlert,
    setOpenAlert,
  } = useAlert();

  useEffect(() => {
    const connectHash = localStorage.getItem('connectHash');
    const logOut = async () => {
      const res = await fetcher('cm/cmsc01020000/delete00', { connectHash: connectHash}, router);
      localStorage.clear();
    }
    if(connectHash){
      logOut();
    }
    // 보안 프로그램 설치여부 체크
    const checkSecurityProgram = async () => {
      // TODO: 실제로 필요한 로직을 구현해야 함.
      console.log("========================보안프로그램 설치여부 확인중====================");
      return true;
    };

    const verifySecurity = async () => {
      const isInstalled = await checkSecurityProgram();
      if (!isInstalled) {
        console.log("========================보안프로그램 설치필요====================");
        router.push('../common/install');
      }
    };

    verifySecurity();
  }, [router]);

  const handleConfirmAlert = () => {
    handleCloseAlert();
  };

  const handleLogin = async (env) => {
    console.log("========================env====================", env);
    // 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      handleOpenAlert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true); // 로딩 상태 시작

    // API 호출
    const url = 'cm/cmsc01020000/select00';
    const param = {
      mbrEmlAddr: email,
      userPswd: password,
    };
    try {
      const data = await fetcher(url, param);
      console.log("data: ", data);

      // 실패 시 수행
      if (!data ||data === 0 || data.errMessage != null || !data.connectHash) {
        setIsLoading(false);
        console.log("=======error in============={}", res.errMessage);
        setAlertMessage(res.errMessage);
        setOpenAlert(true);
        emailRef.current.focus(); // 포커스 이동
        return;
      }

      // 성공 시 수행
      setConnectHash(data.connectHash);
      localStorage.setItem('connectHash', data.connectHash);
      router.push('/main');
      setIsLoading(false);
      return { props: { data } };
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
    }
  };

   return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isLoading && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <CircularProgress />
        </div>
      )}
      <Container maxWidth="sm" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              한국조폐공사 결제플랫폼 로그인
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomFormControl
              email={email}
              setEmail={setEmail}
              emailValid={emailValid}
              setEmailValid={setEmailValid}
              emailLoading={emailLoading}
              setEmailLoading={setEmailLoading}
              emailRef={emailRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="비밀번호"
              variant="outlined"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                onFocus: (e) => e.target.placeholder = '',
                onBlur: (e) => e.target.placeholder = '비밀번호',
              }}
              placeholder="비밀번호"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
            >
              로그인
            </Button>
          </Grid>
        </Grid>
        <CustomMessageModal
          open={openAlert}
          setOpen={setOpenAlert}
          message={alertMessage}
          onConfirm={handleConfirmAlert}
          showCancelButton={false}
        />
      </Container>
    </div>
  );
};

export default LoginPage;