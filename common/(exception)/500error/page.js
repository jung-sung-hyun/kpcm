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
        잠시 후 다시 이용해주세요.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
				일시적인 문제로 시스템 접속이 원활하지 <br />
        않습니다. <br />
        앱 종료 후 다시 접속하세요. <br />
        지속적으로 접속할 수 없는 경우 고객센터로 문의하세요.
			</Typography>
			<br/>
      <Typography variant="body1" gutterBottom>
				고객센터 <br/>
				전화문의 1588-0152(평일 9시 ~ 18시)
			</Typography>
    </Container>
  );
};

export default Custom404;