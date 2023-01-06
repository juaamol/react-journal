import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';
import { NavBar, SideBar } from '../components';
import Toolbar from '@mui/material/Toolbar';

const DRAWER_WIDTH = 240;

export const JournalLayout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <Box display='flex'>
      <NavBar drawerWidth={DRAWER_WIDTH} />
      <SideBar drawerWidth={DRAWER_WIDTH} />
      <Box component='main' flexGrow={1} p={3}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
