import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      bgcolor='primary.main'
      p={4}
      minHeight='100vh'
    >
      <Grid
        item
        xs={3}
        className='box-shadow'
        bgcolor='white'
        p={3}
        borderRadius={2}
      >
        <Typography variant='h5' mb={2}>
          Login page
        </Typography>
        <form>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <TextField label='Email' type='email' fullWidth></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label='Password' type='email' fullWidth></TextField>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant='contained' fullWidth>
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
      </Grid>
    </Grid>
  );
};
