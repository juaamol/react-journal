import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { Formik } from 'formik';
import { registerValidation } from '../validations';

const initialValues = {
  email: '',
  password: '',
  displayName: '',
};

export const RegisterPage = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AuthLayout title='Register'>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={registerValidation}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField
                  label='Name'
                  type='text'
                  fullWidth
                  name='displayName'
                  onBlur={handleBlur}
                  value={values.displayName}
                  onChange={handleChange}
                  error={!!touched.displayName && !!errors.displayName}
                  helperText={touched.displayName && errors.displayName}
                ></TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label='Email'
                  type='email'
                  fullWidth
                  name='email'
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
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
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                ></TextField>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button variant='contained' fullWidth type='submit'>
                    Crear cuenta
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
                <Link color='inherit' to='/auth/login' component={RouterLink}>
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};
