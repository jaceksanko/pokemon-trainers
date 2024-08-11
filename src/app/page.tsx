import { CurrentDate } from '@/components/CurrentDate';
import { CustomButton } from '@/components/CustomButton';
import { Box } from '@mui/material';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Form } from '@/components/form/Form';

export default function Home() {
  return (
    <Box component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box
        component="section"
        sx={{
          width: '100%',
          height: '100vh',
          maxWidth: '480px',
          maxHeight: '550px',
          border: '1px solid',
          borderColor: 'grey.400',
          borderRadius: '2px',
          padding: '32px',
          display: 'flex',
          gap: '24px',
          flexDirection: 'column'
        }}
      >
        <Suspense
          fallback={
            <Box sx={{ textAlign: 'right' }}>
              <CircularProgress color="inherit" size={24} />
            </Box>
          }
        >
          <CurrentDate />
        </Suspense>
        <Form />
        <Box>
          <CustomButton variant="primary">Submit</CustomButton>
        </Box>
      </Box>
    </Box>
  );
}
