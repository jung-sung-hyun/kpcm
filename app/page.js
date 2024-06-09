"use client";
import { useState, useRef, useContext} from 'react';
import { usePathname, useRouter, useSearchParams  } from 'next/navigation';
import { Container, TextField, Button, Typography, Grid, Snackbar, CircularProgress } from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContext';
import { fetcher } from '@apis/api';

/**
 * @description: 로그인을 위한 화면.
 * @function cm0101mq0
 * @param {*} props
 * @returns
 * 변경이 있을 때에는 수정 이ㅣ력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy휴 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.05.16       홍길동                     Method 수정및 추가작업
 * ========================================================================================================
 */
const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectHash, setConnectHash] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('이메일과 비밀번호를 입력해주세요.!');
  const emailRef = useRef(null); // 참조 생성
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const handleLogin = async (env) => {
    setIsLoading(true); // 로딩 상태 시작
    console.log("========================env====================",env);
    console.log("========================email====",email);
    console.log("========================password====",password);
    // 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      setAlertMessage("이메일과 비밀번호를 입력해주세요.");
      setOpenAlert(true);
      return;
    }

    try {
      const res = await fetcher('cm/cmsc01020000/select00', { mbrEmlAddr: email, userPswd: password }, router);
      console.log('Authentication success', res);
      // 성공 시 실행할 추가 작업
      setIsLoading(false);
      console.log("========================connectHash====================: ", res.connectHash);
      setConnectHash(res.connectHash);
      setGlobalState((prevState) => ({
        ...prevState,
        user: { name: 'test user', email: email , useHashCode: res.connectHash},
      }));
      console.log('Routing to:', '/main', 'with query:', { connectHash: res.connectHash });
      router.push('/main?connectHash='+res.connectHash);
    } catch (err) {
      // 실패 시 실행할 부분
      console.error("err: ", err);
      setAlertMessage(err.message);
      setIsLoading(false);
      if (!res ||res === 0 || res.errMessage != null || !res.connectHash) {
        console.log("========================res.errMessage =======error in=============");
        setAlertMessage(res.errMessage);
        setOpenAlert(true);
        emailRef.current.focus(); // 포커스 이동
        console.log("========================res.errMessage =1==2=======43==========",res.errMessage );
        return;
      }
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
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
            <Typography variant="h4" align="center" gutterBottom>
              한국조폐공사 결제플랫폼 로그인
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              type="email"
              autoFocus
              margin="normal"
              value={email}
              inputRef={emailRef}
               onChange={(e) => setEmail(e.target.value)}
              // onChange={(e) => console.log(e.target.value)}
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
              // onChange={(e) => console.log(e.target.value)}
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
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          message={alertMessage}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
          }}
        />
      </Container>
    </div>
  );
};

export default LoginPage;