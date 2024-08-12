'use client';
import { Box, CircularProgress } from '@mui/material';
import { FormInput } from './form/FormInput';
import { IPokemon } from './form/FormAutocomplete';
import { PokemonContent } from './PokemonContent';
import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from './Loader';
import { CustomButton } from './CustomButton';
import { SuccessModal } from './SuccessModal';
import { Form } from './form/Form';
import { useForm } from 'react-hook-form';

export type FormFields = {
  trainerName: string;
  trainerAge: string;
  pokemonData: IPokemon | null;
};
export type FormFieldKeys = keyof FormFields;

export const FormContainer = () => {
  const { handleSubmit, control, watch, reset } = useForm<FormFields>({
    defaultValues: {
      trainerName: '',
      trainerAge: '',
      pokemonData: null
    },
    mode: 'onBlur'
  });
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} control={control} />
      <ErrorBoundary FallbackComponent={({ error }) => <Box sx={{ color: 'error.main' }}>Something went wrong: {error.message}</Box>}>
        <Suspense fallback={<Loader />}>
          <PokemonContent pokemonData={watch('pokemonData')} />
        </Suspense>
      </ErrorBoundary>
      <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <CustomButton variant="soft" onClick={() => reset()}>
          Reset
        </CustomButton>
        <CustomButton type="submit" variant="primary" form="pokemonForm">
          Submit
        </CustomButton>
      </Box>
      <SuccessModal
        open={open}
        onClose={handleClose}
        button={
          <CustomButton
            variant="primary"
            onClick={() => {
              reset();
              handleClose();
            }}
          >
            Reset form
          </CustomButton>
        }
      />
    </>
  );
};
