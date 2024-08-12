'use client';
import { Button } from '@mui/material';

const buttonVariants = {
  soft: {
    backgroundColor: 'grey.400',
    color: 'common.black',
    backgroundColorHoover: 'grey.300'
  },
  primary: {
    backgroundColor: 'primary.main',
    color: 'common.white',
    backgroundColorHoover: 'primary.dark'
  }
};

export const CustomButton = ({
  children,
  variant,
  padding,
  ...props
}: {
  children: React.ReactNode;
  padding?: string;
  variant: 'soft' | 'primary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
}) => {
  const { backgroundColorHoover, ...colorAndBackground } = buttonVariants[variant];
  return (
    <Button
      variant="contained"
      disableRipple
      sx={(theme) => ({
        ...colorAndBackground,
        padding: padding ?? '10px 24px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: backgroundColorHoover
        },
        '&:active': {
          backgroundColor: backgroundColorHoover,
          boxShadow: theme.customShadows.focused
        }
      })}
      {...props}
    >
      {children}
    </Button>
  );
};
