import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import SecurityIcon from '@mui/icons-material/Security';

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
      <Typography variant="h4" component="h1" gutterBottom>
        Security Program Installation Required
      </Typography>
      <Typography variant="body1" gutterBottom>
        To ensure the safety of your information, please install our security program.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download Program
        </Button>
        <Button variant="outlined" color="primary" onClick={handleInstallationGuide}>
          Installation Guide
        </Button>
      </Box>
    </Container>
  );
};

export default SecurityInstall;