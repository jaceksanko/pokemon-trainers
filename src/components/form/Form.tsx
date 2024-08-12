'use client';
import { Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { IPokemon } from './FormAutocomplete';
import { PokemonContent } from '../PokemonContent';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '../Loader';

export type FormFields = {
  trainerName: string;
  trainerAge: string;
  pokemonData: IPokemon | null;
};
export type FormFieldKeys = keyof FormFields;

export const Form = () => {
  const { handleSubmit, control, getValues, watch } = useForm<FormFields>({
    defaultValues: {
      trainerName: '',
      trainerAge: '',
      pokemonData: null
    },
    mode: 'onBlur'
  });

  return (
    <>
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
        <FormInput name="pokemonData" control={control} label="Pokemon name" placeholder="Choose" isAutocomplete />
      </Box>
      <ErrorBoundary FallbackComponent={({ error }) => <Box sx={{ color: 'error.main' }}>Something went wrong: {error.message}</Box>}>
        <Suspense fallback={<Loader />}>
          <PokemonContent pokemonData={watch('pokemonData')} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
