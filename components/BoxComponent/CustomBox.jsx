import Box from '@mui/material/Box';

const CustomBox = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default CustomBox;