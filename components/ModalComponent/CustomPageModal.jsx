import Modal from '@mui/material/Modal';

const CustomPageModal = ({ open, onClose, children, ...props }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...props}
    >
      {children}
    </Modal>
  );
};

export default CustomPageModal;