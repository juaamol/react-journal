import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { FormEvent, useMemo } from 'react';
import { checkingAuthentication, startGoogleSignIn } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const LoginPage = () => {
  const { status } = useAppSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const dispatch = useAppDispatch();
  const { formState, onInputChange } = useForm({
    email: '',
    password: '',
  });
  const { email, password } = formState;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(checkingAuthentication(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type='email'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid container spacing={2}>
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
            <Link color='inherit' to='/auth/register' component={RouterLink}>
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
