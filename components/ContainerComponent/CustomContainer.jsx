import { Container } from '@mui/material';

const CommonContainer = ({ children, ...props }) => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ padding: '24px', marginTop: '16px', ...props.sx }} 
      {...props}
    >
      {children}
    </Container>
  );
};

export default CommonContainer;