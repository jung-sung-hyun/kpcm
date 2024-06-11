import * as React from 'react';
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

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(20),
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  marginBottom: theme.spacing(20),
  paddingRight: theme.spacing(5),
}));

const CustomMessageModal = ({ title, content, open, onClose, onOpen, actions }) => {
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={onOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CustomDialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
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
        </CustomDialogTitle>
        <CustomDialogContent dividers>
          {content}
        </CustomDialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomMessageModal;