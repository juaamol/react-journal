import Grid from '@mui/material/Grid';
import StarOutline from '@mui/icons-material/StarOutline';
import Typography from '@mui/material/Typography';

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      bgcolor='primary.main'
      flexGrow={1}
      borderRadius={3}
    >
      <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      <Typography variant='h5' color='white'>
        Select or create an entry
      </Typography>
    </Grid>
  );
};
