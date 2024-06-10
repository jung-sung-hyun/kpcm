import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography } from '@mui/material';

const CustomFileUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed grey',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border .24s ease-in-out',
        ...(isDragActive && {
          borderColor: 'primary.main',
        }),
      }}
    >
      <input {...getInputProps()} />
      <Typography>
        {isDragActive ? 'Drop the files here ...' : 'Drag & drop a file here, or click to select one'}
      </Typography>
      <Button variant="contained" component="span">
        Select File
      </Button>
    </Box>
  );
};