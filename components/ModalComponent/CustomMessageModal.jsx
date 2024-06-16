import { Modal, Typography, Button, Box } from '@mui/material';

const CustomMessageModal = ({ open, setOpen, message, onConfirm, showCancelButton = true, confirmLabel = "확인", cancelLabel = "취소" }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          알림
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          {showCancelButton && (
            <Button onClick={handleClose} color="primary">
              {cancelLabel}
            </Button>
          )}
          <Button onClick={onConfirm} color="primary" autoFocus>
            {confirmLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomMessageModal;