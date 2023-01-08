import { SaveOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ImageGallery } from '../components';

export const NoteView = () => {
  return (
    <Grid
      container
      className='animate__animated animate__fadeIn animate__fater'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      pb={3}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {new Date().toDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Button color='primary' variant='contained'>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          <Typography>Save</Typography>
        </Button>
      </Grid>
      <Grid container rowSpacing={2} mt={1} mb={1}>
        <Grid item xs={12}>
          <TextField
            type='text'
            variant='filled'
            fullWidth
            placeholder='Add a title'
            label='title'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type='text'
            variant='filled'
            fullWidth
            multiline
            minRows={5}
            placeholder='What happened today?'
            label='Description'
          />
        </Grid>
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
