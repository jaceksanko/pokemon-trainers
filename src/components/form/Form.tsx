'use client';
import { Box, FormControl, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { IPokemon } from './FormAutocomplete';

export type FormFields = {
  trainerName: string;
  trainerAge: string;
  pokemonName: IPokemon | null;
};

export const Form = () => {
  const { handleSubmit, control, watch } = useForm<FormFields>({
    defaultValues: {
      trainerName: '',
      trainerAge: '',
      pokemonName: null
    },
    mode: 'onBlur'
  });
 
  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}
    >
      <FormInput
        name="trainerName"
        rules={{
          required: 'This field cannot be empty',
          minLength: {
            value: 2,
            message: 'Minimum length is 2 characters'
          },
          maxLength: {
            value: 20,
            message: 'Maximum length is 20 characters'
          }
        }}
        control={control}
        label="Trainer's name"
        placeholder="Trainer's name"
      />
      <FormInput
        rules={{
          minLength: {
            value: 16,
            message: 'Minimum length is 16 characters'
          },
          maxLength: {
            value: 99,
            message: 'Maximum length is 99 characters'
          }
        }}
        name="trainerAge"
        control={control}
        label="Trainer's age"
        placeholder="Trainer's age"
      />
      <FormInput
        name="pokemonName"
        control={control}
        label="Pokemon name"
        placeholder="Choose"
        isAutocomplete
      />
    </Box>
  );
};
