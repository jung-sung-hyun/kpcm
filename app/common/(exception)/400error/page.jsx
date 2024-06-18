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
				안정적인 서비스 제공을 위해 시스템을 <br />
				점검하고 있습니다.
			</Typography>
			<Typography variant="h8" component="h2" gutterBottom>
				기간: 매월 월요일 23:30 ~ 다음날 화요일 08:00 <br/>
				사유: 시스템 정기점검 <br/>
				이용제한서비스 : 전체 
			</Typography>
			<Typography variant="h8" component="h2" gutterBottom>
				점검 사정에 따라 서비스 점검기간은 변경될 수 <br/>있습니다.
			</Typography>
      <Typography variant="body1" gutterBottom>
				고객센터 <br/>
				전화문의 1588-0152(평일 9시 ~ 18시)
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