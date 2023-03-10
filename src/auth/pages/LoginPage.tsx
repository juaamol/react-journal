import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo } from 'react';
import { Formik } from 'formik';
import { startPasswordSignIn, startGoogleSignIn } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginValidation } from '../validations';
import Alert from '@mui/material/Alert';

const initialValues = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const dispatch = useAppDispatch();

  const onSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    dispatch(startPasswordSignIn(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={loginValidation}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            name='Login'
            onSubmit={handleSubmit}
            className='animate__animated animate__fadeIn animate__fater'
          >
            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField
                  label='Email'
                  type='email'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  type='password'
                  fullWidth
                  name='password'
                  inputProps={{
                    label: 'Password',
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                ></TextField>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    disabled={isAuthenticating}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant='contained'
                    fullWidth
                    aria-label='google'
                    onClick={onGoogleSignIn}
                    disabled={isAuthenticating}
                  >
                    <Google /> <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                pt={1}
                direction='row'
                justifyContent='end'
              >
                <Link
                  color='inherit'
                  to='/auth/register'
                  component={RouterLink}
                >
                  Create an account
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};
