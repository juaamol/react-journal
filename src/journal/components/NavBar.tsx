import MenuOutlined from '@mui/icons-material/MenuOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { startLogingOut } from '../../store/auth/thunks';

interface NavBarProps {
  drawerWidth: number;
  onToggleSideBar?: () => void;
}

export const NavBar: FC<NavBarProps> = (props) => {
  const { drawerWidth = 240, onToggleSideBar } = props;
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(startLogingOut());
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: drawerWidth },
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={onToggleSideBar}
        >
          <MenuOutlined></MenuOutlined>
        </IconButton>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6' noWrap component='span'>
            Journal
          </Typography>
          <IconButton color='error' onClick={onLogout}>
            <LogoutOutlined></LogoutOutlined>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
