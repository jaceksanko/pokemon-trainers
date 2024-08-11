import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ControllerRenderProps } from 'react-hook-form';
import { FormFields } from './Form';

export interface IPokemon {
  name: string;
  id: number;
}

export const FormAutocomplete = ({
  id,
  placeholder,
  sx,
  field
}: {
  id: string;
  placeholder: string;
  sx?: SxProps<Theme>;
  field: ControllerRenderProps<FormFields, 'trainerName' | 'trainerAge' | 'pokemonName'>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly IPokemon[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const ExpandIcon = open ? ExpandLessIcon : ExpandMoreIcon;

  React.useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const res = await fetch(`/api/search?name=${value}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data) {
          setOptions([...data?.data]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={id}
      open={open}
      slotProps={{
        paper: {
          sx: {
            marginTop: '5px',
            '& .MuiAutocomplete-listbox': {
              '& .MuiAutocomplete-option:hover, & .MuiAutocomplete-option.Mui-focused': {
                backgroundColor: 'primary.light'
              }
            }
          }
        }
      }}
      sx={sx}
      onOpen={() => {
        setOpen(true);
        setLoading(options.length === 0);
      }}
      onClose={() => {
        setValue('');
        setOpen(false);
      }}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <ExpandIcon
                    sx={{ fontSize: 20, cursor: 'pointer' }}
                    onClick={() => {
                      setOpen(!open);
                      setLoading(options.length === 0);
                    }}
                  />
                )}
              </React.Fragment>
            ),
            sx: {
              '&.MuiOutlinedInput-root .MuiAutocomplete-input': {
                padding: 0
              },

              '&.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot': {
                padding: '14px 10px'
              }
            }
          }}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);
            setValue(event.target.value);
          }}
        />
      )}
      onChange={(event, item) => {
        field.onChange(item);
      }}
    />
  );
};
