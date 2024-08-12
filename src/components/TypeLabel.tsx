import { Box, Typography } from '@mui/material';

export const TypeLabel = ({ type }: { type: string }) => {
  return (
    <Box component="span" sx={{ borderRadius: '16px', backgroundColor: 'primary.light' }}>
      <Typography component="span" variant="h2" p="4px 8px">
        {type}
      </Typography>
    </Box>
  );
};
