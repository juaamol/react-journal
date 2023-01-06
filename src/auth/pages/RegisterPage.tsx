import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Register'>
      <form>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField label='Name' type='text' fullWidth></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Email' type='email' fullWidth></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' type='email' fullWidth></TextField>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth>
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
    </AuthLayout>
  );
};
