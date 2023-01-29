import Box from '@mui/material/Box';
import { FC, ReactNode, useState } from 'react';
import { NavBar, SideBar } from '../components';
import Toolbar from '@mui/material/Toolbar';

const DRAWER_WIDTH = 240;

export const JournalLayout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const onToggleSideBar = () => {
    setIsSideBarOpen((isOpen) => !isOpen);
  };
  return (
    <Box
      display='flex'
      className='content animate__animated animate__fadeIn animate__fater'
    >
      <NavBar drawerWidth={DRAWER_WIDTH} onToggleSideBar={onToggleSideBar} />
      <SideBar drawerWidth={DRAWER_WIDTH} isOpen={isSideBarOpen} />
      <Box
        component='main'
        flexGrow={1}
        p={3}
        flexDirection='column'
        display='flex'
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
