import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import IconButton from '@mui/material/IconButton';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { startNewNote } from '../../store/journal/thunks';
import { useAppSelector, useAppDispatch } from '../../hooks';

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const journalState = useAppSelector((state) => state.journal);
  const onNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {journalState.active ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        onClick={onNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {
            backgroundColor: 'error.main',
            opacity: 0.9,
          },
          position: 'fixed',
          right: 50,
          bottom: 50,
          '&[disabled]': {
            backgroundColor: 'error.main',
            opacity: 0.26,
            color: 'white',
          },
        }}
        disabled={journalState.isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
