// pages/404.js
"use client";
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const Processing = () => {
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
        처리중입니다.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        잠시만 기다려주세요.
      </Typography>
    </Container>
  );
};

export default Processing;