import Button from '@mui/material/Button';

const CustomButton = ({ variant, color, onClick, children, ...props }) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;