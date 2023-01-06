import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FC, ReactNode } from 'react';

export const AuthLayout: FC<{ children: ReactNode; title: string }> = (
  props,
) => {
  const { children, title } = props;

  return (
    <Grid
      className='content'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      bgcolor='primary.main'
      p={4}
      minHeight='100%'
    >
      <Grid
        item
        xs={3}
        sx={{ width: { sm: 450 } }}
        className='box-shadow'
        bgcolor='white'
        p={3}
        borderRadius={2}
      >
        <Typography variant='h5' mb={2}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
