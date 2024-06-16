import { useState, useCallback } from 'react';

const useAlert = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleOpenAlert = useCallback((message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  }, []);

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  return {
    openAlert,
    alertMessage,
    handleOpenAlert,
    handleCloseAlert,
    setOpenAlert,
  };
};

export default useAlert;