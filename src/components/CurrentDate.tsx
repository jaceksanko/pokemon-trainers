import { Typography } from '@mui/material';
import moment from 'moment-timezone';

const TIMEZONE = 'Europe/Warsaw';

export const CurrentDate = async () => {
  try {
    const now = moment().tz(TIMEZONE);

    const midnight = moment().tz(TIMEZONE).endOf('day');
    const timeToMidnight = midnight.diff(now, 'seconds');

    const res = await fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=${TIMEZONE}`, {
      next: { revalidate: timeToMidnight }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch date');
    }

    const data = await res.json();
    const date = moment(data.datetime).tz(TIMEZONE).format('dddd, DD.MM.YYYY');

    return (
      <Typography data-testid="current-date" variant="h2" sx={{ textAlign: 'right' }}>
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
