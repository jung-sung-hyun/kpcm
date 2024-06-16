"use client";
import { useMemo, useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Grid, CircularProgress, Box, FormControl, OutlinedInput, FormHelperText, InputAdornment } from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContext';
import { fetcher } from '@apis/api';
import { useSearchParams } from "next/navigation";
import CustomMessageModal from '@components/ModalComponent/CustomMessageModal';
import { useFormControl } from '@mui/material/FormControl';
import CustomFormControl from '@components/TextFieldComponent/CustomFormControl';
import useAlert from '@hooks/useAlert';
import './common/common';

/**
 * @description: 로그인을 위한 화면.
 * @function cm0101mq0
 * @param {*} props
 * @returns
 * 변경이 있을 때에는 수정 이력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.06.13       박대철                     컴포넌트 유효성체크 공통화 작업
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
  const emailRef = useRef(null); // 참조 생성
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
    const checkSecurityProgram = async () => {
      // 보안 프로그램이 설치되어 있는지 확인하는 비동기 로직
      // TODO: 실제로 필요한 로직을 구현해야 함.
      console.log("========================보안프로그램 설치여부 확인중====================");
      // 여기에서 실제로 보안 프로그램이 설치되어 있는지 확인하는 비동기 작업을 수행
      // 예시로는 단순히 true를 반환합니다. 실제로는 필요한 로직을 구현하세요.
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
    console.log("도착!!");
    handleCloseAlert();
  };

  const handleLogin = async (env) => {
    console.log("========================env====================", env);
    console.log("========================email====", email);
    console.log("========================password====", password);
    // 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      handleOpenAlert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true); // 로딩 상태 시작

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc01020000/select00`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mbrEmlAddr: email, userPswd: password })
    })
      .then((response) => {
        console.log("response:",response);
        console.log("response code: ", response.status);
        setIsLoading(false);
        if (response.status === 200) {
          console.log('Authentication success');
          return response.json();
        } else if (response.status === 400) {
          console.log('Authentication failed');
          router.push('/exception/400error');
        } else if (response.status === 500 || response.status === 501) {
          console.log("response:","500 error: ");
          console.log(response);
          console.log("response code: ", response.status);

          console.log('Authentication failed');
          return response.json().then(err => { setAlertMessage(err.errorMessage); });
          //setAlertMessage(res.message);
          //router.push('/exception/500error');
        } else {
          // 기타 상태 코드
          router.push('/exception/network-error');
        }
      })
      .then((result) => {
        setIsLoading(false);
        // 성공 시 실행할 부분
        return result;
      })
      .catch((err) => {
        setIsLoading(false);
        // 인터넷 문제로 실패 시 실행할 부분
        console.log("===================1====>>>err: ", err);
        router.push('/exception/network-error');
        return err;
      });

      console.log("res: ");
      console.log(res);
    // 실패 시 실행할 부분
    if (!res ||res === 0 || res.errMessage != null || !res.connectHash) {
      console.log("========================res.errMessage =======error in============={}",res.errMessage);
      setAlertMessage(res.errMessage);
      setOpenAlert(true);
      emailRef.current.focus(); // 포커스 이동
      return;
    }
    //console.log("========================connectHash====================");
    //console.log(res.connectHash);
    //setConnectHash(res.connectHash);
    router.push('/main');
    //console.log('Routing to:', '/main', 'with query:', { connectHash: res.connectHash });
    //router.push('/main?connectHash='+res.connectHash);
    return { props: { res } };

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