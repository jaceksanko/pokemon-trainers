import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ControllerRenderProps } from 'react-hook-form';
import { FormFieldKeys, FormFields } from '../FormContainer';
import debounce from 'debounce';
import { useQuery } from '@tanstack/react-query';

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
  field: ControllerRenderProps<FormFields, FormFieldKeys>;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useQuery<IPokemon[]>({
    queryKey: ['pokemonName', value],
    queryFn: async () => {
      const res = await fetch(`/api/search?name=${value}`);
      if (!res.ok) {
        throw new Error('Failed to fetch pokemon data');
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !!value || value === ''
  });

  console.log('data', data);

  const ExpandIcon = open ? ExpandLessIcon : ExpandMoreIcon;

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
      }}
      onClose={() => {
        setValue('');
        setOpen(false);
      }}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.name}
      options={data ?? []}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading && open ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <ExpandIcon
                    sx={{ fontSize: 20, cursor: 'pointer' }}
                    onClick={() => {
                      setOpen(!open);
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
          onChange={debounce((event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }, 2000)}
        />
      )}
      value={field.value as IPokemon | null}
      onChange={(event, item) => {
        field.onChange(item);
      }}
    />
  );
};
