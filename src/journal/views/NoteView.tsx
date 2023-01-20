import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ImageGallery } from '../components';
import { Note, updateNote } from '../../store/journal/journal-slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { startSavingNote } from '../../store/journal';
import { useAppSelector } from '../../hooks';
import { ChangeEvent, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { IconButton } from '@mui/material';

export const NoteView = (props: { note: Note }) => {
  const { note } = props;
  const { isSaving, savedMessage } = useAppSelector((state) => state.journal);
  const dateFormater = Intl.DateTimeFormat('en', { dateStyle: 'long' });
  const date = dateFormater.format(note.date);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      //dispatch(startUploadingFiles(files));
    }
  };

  useEffect(() => {
    if (savedMessage.length) {
      Swal.fire('Note saved', savedMessage, 'success');
    }
  }, [savedMessage]);

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
          {date}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type='file'
          ref={inputRef}
          multiple
          onChange={onFileSelect}
          style={{ display: 'none' }}
        />
        <IconButton
          onClick={() => inputRef.current?.click()}
          disabled={isSaving}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color='primary'
          variant='contained'
          onClick={onSaveNote}
          disabled={isSaving}
        >
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
            onChange={(e) => dispatch(updateNote({ title: e.target.value }))}
            value={note.title}
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
            onChange={(e) => dispatch(updateNote({ body: e.target.value }))}
            value={note.body}
          />
        </Grid>
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
