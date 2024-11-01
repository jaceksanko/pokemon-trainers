import React, { useState } from 'react';
import { Control, FormSubmitHandler, SubmitErrorHandler, SubmitHandler, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { FormFields } from './FormContainer';
// import { SuccessModal } from './SuccessModal';
import { CustomButton } from './CustomButton';
import { Form } from './form/Form';
import dynamic from 'next/dynamic';
//const SuccessModal = dynamic(() => import('./SuccessModal').then((mod) => mod.SuccessModal));

type FormAndSuccessModalProps = {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<FormFields, undefined>;
  control: Control<FormFields, any>;
  reset: UseFormReset<FormFields>;
};

type ComponentsState = {
  SuccessModal?: React.ComponentType<any>;
};

export const FormAndSuccessModal = ({ children, handleSubmit, control, reset }: FormAndSuccessModalProps) => {
  const [open, setOpen] = useState(false);
  const [components, setComponents] = useState<ComponentsState>({});

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    const SuccessModal = dynamic(() => import('./SuccessModal').then((mod) => mod.SuccessModal));
    setComponents({ SuccessModal });
    setOpen(true);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} control={control} />
      {children}
      {components?.SuccessModal && (
        <components.SuccessModal
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
      )}
    </>
  );
};
