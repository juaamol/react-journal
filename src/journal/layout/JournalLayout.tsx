import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';
import { NavBar } from '../components';

const DRAWER_WIDTH = 240;

export const JournalLayout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <Box display='flex'>
      <NavBar drawerWidth={DRAWER_WIDTH}></NavBar>
      <Box component='main' flexGrow={1} p={3}>
        {children}
      </Box>
    </Box>
  );
};
