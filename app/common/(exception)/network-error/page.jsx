// pages/404.js
"use client";
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const NetworkError = () => {
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
        오프라인 상태입니다.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
				인터넷 연결상태를 확인하시고 다시 <br/> 이용해주세요.
			</Typography>
			<br/>
      <Typography variant="body1" gutterBottom>
				고객센터 <br/>
				전화문의 010-8525-0152(평일 9시 ~ 18시)
			</Typography>
			<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          새로고침
        </Button>
      </Box>
    </Container>
  );
};

export default NetworkError;