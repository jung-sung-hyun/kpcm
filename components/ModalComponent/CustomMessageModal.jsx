import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomMessageModal = ({ title, content, open, onClose, onOpen, actions }) => {
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={onOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomMessageModal;