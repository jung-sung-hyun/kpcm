// pages/404.js
"use client";
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const RateLimit = () => {
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
        순서를 기다리는 중입니다.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        현재 동시접속자가 많아 순서를 기다리고
        <br />있습니다.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        2번째 입장 예정입니다.
        <br />예상대기시간은 0분 10초 입니다.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        다시 접속하시면 처음부터 다시 대기하셔야 해요. <br />
        조금만 기다리시면 대기 순서에 따라 자동으로 <br />
        접속됩니다.
      </Typography>
      <br />
      <Typography variant="body1" gutterBottom>
        고객센터 <br />
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

export default RateLimit;