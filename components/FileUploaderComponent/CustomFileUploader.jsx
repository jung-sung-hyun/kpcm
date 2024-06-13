import { useDropzone } from 'react-dropzone';
import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * @description: 파일 업로드 공통 컴포넌트를 정의한다.
 * @function CustomFileUploader
 * @param {function} onDrop - 파일이 드롭되거나 선택될 때 호출되는 함수.
 * @param {string} [accept='image/*,.pdf'] - 허용할 파일 타입.
 * @param {boolean} [multiple=false] - 여러 파일 업로드를 허용할지 여부.
 * @param {number} [maxSize=20971520] - 최대 파일 크기 (바이트 단위).
 * @param {number} [maxFiles=5] - 최대 업로드 파일 개수.
 * @param {string} [buttonLabel='Select File'] - 버튼 레이블.
 * @param {object} [sx={}] - 추가적인 스타일 설정.
 * @returns {JSX.Element} - 커스텀 파일 업로더 컴포넌트를 반환한다.
 */

const CustomFileUploader = ({
  onDrop,
  accept = 'image/jpeg,image/png,application/pdf,image/gif,application/zip,application/x-7z-compressed',
  multiple = false,
  maxSize = 20971520, // 20MB
  maxFiles = 5,
  buttonLabel = 'Select File',
  sx = {},
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxSize,
    maxFiles,
    accept,
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach(file => {
        if (file.errors) {
          file.errors.forEach(error => {
            if (error.code === 'file-invalid-type') {
              alert(`Invalid file type: ${file.file.name}`);
            } else if (error.code === 'file-too-large') {
              alert(`File too large: ${file.file.name}. Max size is 20MB.`);
            } else if (error.code === 'too-many-files') {
              alert(`Too many files. Maximum number of files is ${maxFiles}.`);
            }
          });
        }
      });
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        textAlign: 'center',
        cursor: 'pointer',
        border: '2px dashed grey',
        borderRadius: 2,
        p: 2,
        transition: 'border .24s ease-in-out',
        ...(isDragActive && { borderColor: 'primary.main' }),
        ...sx,
      }}
    >
      <input {...getInputProps()} />
      <Button variant="contained" component="span">
        {buttonLabel}
      </Button>
    </Box>
  );
};

CustomFileUploader.propTypes = {
  onDrop: PropTypes.func.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  buttonLabel: PropTypes.string,
  sx: PropTypes.object,
};

export default CustomFileUploader;