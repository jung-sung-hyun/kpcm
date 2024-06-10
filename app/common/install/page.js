"use client";
import { Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/system';
import SecurityIcon from '@mui/icons-material/Security';

const createData = (column1, column2, column3, column4, column5) => {
  return { column1, column2, column3, column4, column5 };
};

const rows = [
  createData('CROSSCERT UniCRSV3', '공동인증서 이용을 위한 프로그램', '미설치', '다운로드', '지원받기'),
  createData('TouchEn nxKey', '입력하는 데이터를 보호하기 위한 키보드 보안 프로그램', '설치', '다운로드', '지원받기'),
  createData('TouchEn nxWeb', '웹 콘텐츠 유출을 방지하는 보안 프로그램', '미설치', '다운로드', ''),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: 'gray',
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  borderColor: 'blue',
  borderBottom: '2px solid blue',
}));

const SecurityInstall = () => {
  const router = useRouter();

  const handleDownload = () => {
    // 다운로드 링크로 이동
    window.location.href = '/path/to/security-program';
  };

  const handleInstallationGuide = () => {
    router.push('/installation-guide');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <SecurityIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" component="h1">
        안전한 서비스 이용을 위해 보안프로그램을 설치하세요.
      </Typography>
      <Box variant="body1" align='left'>
        <ul>
          <li>프로그램 설치가 완료되면 [F5]키 또는 브라우저 새로고침을 하시거나, 브라우저를 종료하신 후 다시 접속하세요.</li>
          <li>설치가 정상적으로 진행되지 않은 경우 다운로드 창에서 [저장]버튼을 선택하여, PC에 직접 다운로드 하신 후 실행하세요.</li>
          <li>설치화면이 반복적으로 제공되는 경우 브라우저를 종료하신 후 다시 접속하세요.</li>
          <li>IE7 이하 브라우저에서 공동인증프로그램을 설치하고자 하는 경우 이전버전용 보안프로그램을 설치하여 이용해주세요.</li>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            이전버전 공동인증프로그램 설치하기
          </Button>
          <li>설치된 보안프로그램 삭제는 '제어판 &gt; 프로그램관리' 또는 '프로그램 추가/제거' 에서 가능합니다.</li>
        </ul>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: '1px solid lightgray' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell align="center">프로그램명</StyledTableHeadCell>
              <StyledTableHeadCell align="center">기능</StyledTableHeadCell>
              <StyledTableHeadCell align="center">설치상태</StyledTableHeadCell>
              <StyledTableHeadCell align="center">다운로드</StyledTableHeadCell>
              <StyledTableHeadCell align="center">설치 중 오류문의</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <StyledTableCell align="center">{row.column1}</StyledTableCell>
                <StyledTableCell align="center">{row.column2}</StyledTableCell>
                <StyledTableCell align="center">{row.column3}</StyledTableCell>
                <StyledTableCell align="center">{row.column4}</StyledTableCell>
                <StyledTableCell align="center">{row.column5}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
        <Typography variant="subtitle1" align='center'>
          설치완료 후 자동으로 로그인 화면으로 이동합니다. 설치 후 1분 이상 화면이 이동하지 않는 경우 새로고침 버튼을 선택해주세요.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          새로고침
        </Button>
      </Box>
    </Container>
  );
};

export default SecurityInstall;