import { CurrentDate } from '@/components/CurrentDate';
import { Box } from '@mui/material';
import { Suspense } from 'react';
import { FormContainer } from '@/components/FormContainer';
import { Loader } from '@/components/Loader';

export default function Home() {
  return (
    <Box component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box
        component="section"
        sx={{
          width: '100%',
          maxWidth: '480px',
          border: '1px solid',
          borderColor: 'grey.400',
          borderRadius: '2px',
          padding: '32px',
          display: 'flex',
          gap: '24px',
          flexDirection: 'column',
          margin: '10px'
        }}
      >
        <Suspense fallback={<Loader />}>
          <CurrentDate />
        </Suspense>
        <FormContainer />
      </Box>
    </Box>
  );
}
