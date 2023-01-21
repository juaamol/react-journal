import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TurnedInNot from '@mui/icons-material/TurnedInNot';
import ListItemText from '@mui/material/ListItemText';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setActiveNote } from '../../store/journal';

export const SideBar: FC<{ drawerWidth: number }> = (props) => {
  const { drawerWidth = 240 } = props;
  const { auth, journal } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const username = auth.displayName;
  const notes = journal.notes;

  return (
    <Box
      component='nav'
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='span'>
            {username}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <ListItem key={note.id} disablePadding>
              <ListItemButton onClick={() => dispatch(setActiveNote(note))}>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container flexDirection='column'>
                  <ListItemText primary={note.title} />
                  <ListItemText secondary={note.body} />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
