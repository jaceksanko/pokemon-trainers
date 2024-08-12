import { Box } from "@mui/material";
import { FormInput } from "./FormInput";
import { FormEventHandler } from "react";
import { Control } from "react-hook-form";
import { FormFields } from "../FormContainer";

export const Form = ({ onSubmit, control }: { onSubmit: FormEventHandler<HTMLFormElement> | undefined; control: Control<FormFields> }) => {
  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
      id="pokemonForm"
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
        type="number"
        rules={{
          min: {
            value: 16,
            message: 'Minimum number is 16'
          },
          max: {
            value: 99,
            message: 'Maximum number is 99'
          }
        }}
        name="trainerAge"
        control={control}
        label="Trainer's age"
        placeholder="Trainer's age"
      />
      <FormInput
        name="pokemonData"
        rules={{
          required: 'This field cannot be empty'
        }}
        control={control}
        label="Pokemon name"
        placeholder="Choose"
        isAutocomplete
      />
    </Box>
  );
};