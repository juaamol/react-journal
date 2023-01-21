import * as yup from 'yup';

export const registerValidation = yup.object().shape({
  displayName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});
