import { CustomButton } from '@/components/CustomButton';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <main>
      <Box sx={{ margin: '50px' }}>
        <CustomButton variant="primary">Submit</CustomButton>
      </Box>
      <Box sx={{ margin: '50px' }}>
        <CustomButton variant="soft">Submit</CustomButton>
      </Box>
    </main>
  );
}
