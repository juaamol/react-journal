import { ChangeEvent, useState } from 'react';

export interface FormFields {
  [key: string]: any;
}

export interface Form<T> {
  formState: T;
  onInputChange: (
    element: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onResetForm: () => void;
}

export function useForm<T extends FormFields>(initialForm: T): Form<T> {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (
    element: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = element.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
}
