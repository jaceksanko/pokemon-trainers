import { Box, Dialog, Typography } from '@mui/material';

export const SuccessModal = ({ open, button, onClose }: { open: boolean; button: JSX.Element; onClose: (value: boolean) => void }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ padding: '32px 120px' }}>
      <Box sx={{ padding: '32px 120px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Typography variant="body1" fontSize="40px" lineHeight="normal">
          Success
        </Typography>
        {button}
      </Box>
    </Dialog>
  );
};
