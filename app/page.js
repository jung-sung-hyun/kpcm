"use client";
import { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Grid, Snackbar, CircularProgress } from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContext';
import { fetcher } from '@apis/api';

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
 *   2024.05.16       홍길동                     Method 수정 및 추가 작업
 * ========================================================================================================
 */
const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectHash, setConnectHash] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('이메일과 비밀번호를 입력해주세요.');
  const emailRef = useRef(null); // 참조 생성
  const [isLoading, setIsLoading] = useState(false);
  const { globalState, setGlobalState } = useContext(GlobalContext);

  useEffect(() => {
    const checkSecurityProgram = async () => {
      // 보안 프로그램이 설치되어 있는지 확인하는 비동기 로직
      // TODO: 실제로 필요한 로직을 구현해야 함.
      console.log("========================보안프로그램 설치여부 확인중====================");
      // 여기에서 실제로 보안 프로그램이 설치되어 있는지 확인하는 비동기 작업을 수행
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

  const handleLogin = async (env) => {
    if (isLoading) return; // 로딩 중이면 중복 호출 방지
    setIsLoading(true); // 로딩 상태 시작
    console.log("========================env====================", env);
    console.log("========================email====", email);
    console.log("========================password====", password);
    // 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      setAlertMessage("이메일과 비밀번호를 입력해주세요.");
      setOpenAlert(true);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetcher('cm/cmsc01020000/select00', { mbrEmlAddr: email, userPswd: password }, router);
      console.log('Authentication success', res);
      // 성공 시 실행할 추가 작업
      console.log("========================connectHash====================: ", res.connectHash);
      setConnectHash(res.connectHash);
      setGlobalState((prevState) => ({
        ...prevState,
        user: { name: 'test user', email: email, useHashCode: res.connectHash },
      }));
      console.log('Routing to:', '/main', 'with query:', { connectHash: res.connectHash });
      router.push('/main?connectHash=' + res.connectHash);
    } catch (err) {
      // 실패 시 실행할 부분
      console.error("err: ", err);
      setAlertMessage(err.message);
      setOpenAlert(true);
      emailRef.current.focus(); // 포커스 이동
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
    console.log("========================connectHash====================");
    console.log(res.connectHash);
    setConnectHash(res.connectHash);
    // router.push('/main');
    console.log('Routing to:', '/main', 'with query:', { connectHash: res.connectHash });
    router.push('/main?connectHash='+res.connectHash);


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
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
              disabled={isLoading} // 로딩 중이면 버튼 비활성화
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