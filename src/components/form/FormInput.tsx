import { FormControl, InputLabel, Typography, OutlinedInput, Theme, FormHelperText } from '@mui/material';
import { FormAutocomplete } from './FormAutocomplete';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { FormFieldKeys, FormFields } from '../FormContainer';

const inputStyles = (theme: Theme) => ({
  'label + &': {
    marginTop: '16px'
  },
  '& .MuiInputBase-input': {
    borderRadius: 2,
    padding: '14px 10px',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    boxShadow: theme.customShadows.focused,
    border: '1px solid'
  },
  '&:hover': {
    boxShadow: theme.customShadows.focused
  }
});

export const FormInput = ({
  name,
  label,
  placeholder,
  isAutocomplete,
  control,
  rules,
  type = 'text'
}: {
  name: FormFieldKeys;
  label: string;
  placeholder: string;
  isAutocomplete?: boolean;
  control: Control<FormFields>;
  rules?: Omit<RegisterOptions<FormFields, FormFieldKeys>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> | undefined;
  type?: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="standard" sx={{ gridColumn: isAutocomplete ? 'span 2' : 'span 1' }}>
          <InputLabel shrink htmlFor={label}>
            <Typography variant="h2">{label}</Typography>
          </InputLabel>
          {isAutocomplete ? (
            <FormAutocomplete id={label} placeholder={placeholder} sx={inputStyles} field={field} />
          ) : (
            <OutlinedInput id={label} placeholder={placeholder} sx={inputStyles} {...field} type={type} />
          )}
          {!!error && error.message && (
            <FormHelperText sx={{ fontSize: '10px', lineHeight: '16px', color: 'error.main' }} error>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
