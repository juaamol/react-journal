import * as yup from 'yup';

export const loginValidation = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});
