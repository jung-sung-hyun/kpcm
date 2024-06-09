// pages/404.js
"use client";
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
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
      <Typography variant="h3" component="h3" gutterBottom>
        페이지를 찾을 수 없어요.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
				접속하려는 페이지가 <br/>삭제 또는 변경되었거나, 일시적으로 사용이 <br/>중단되었어요.
				<br/>링크정보, 접근 권한 등을 다시 한번 확인해주세요.
			</Typography>
			<br/>
      <Typography variant="body1" gutterBottom>
				고객센터 <br/>
				전화문의 010-8525-0152(평일 9시 ~ 18시)
			</Typography>
			<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleBackToHome}>
          이전
        </Button>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          홈으로
        </Button>
      </Box>
    </Container>
  );
};

export default Custom404;