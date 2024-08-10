import { Box, Typography } from '@mui/material';
import moment from 'moment';

export const CurrentDate = async () => {
  try {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    const timeToMidnight = Math.floor((midnight.getTime() - now.getTime()) / 1000);

    const res = await fetch('http://worldtimeapi.org/api/ip', {
      next: { revalidate: timeToMidnight }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch date');
    }

    const data = await res.json();
    const date = moment(data.datetime).format('dddd, DD.MM.YYYY');

    return (
      <Typography variant="h2" sx={{ textAlign: 'right' }}>
        {date}
      </Typography>
    );
  } catch (error) {
    console.error('Error fetching date:', error);
    return (
      <Typography variant="h2" sx={{ textAlign: 'right' }}>
        Failed to load date
      </Typography>
    );
  }
};
