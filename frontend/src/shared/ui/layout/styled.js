import { styled } from '@mui/material/styles';
import { WiniDrawer, WiniListItem } from '@/shared/ui/wini';

export const drawerWidth = 280;
export const barHeight = 45;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  borderTop: 1,
  overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderTop: '0px !important',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)})`,
  [theme.breakpoints.up('xs')]: {
    width: `calc(${theme.spacing(0)})`,
  },
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} )`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  background: '#eff2f8',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  flexShrink: 0,
  // NOTE:
  // - This header is intended to be compact (barHeight = 45).
  // - `theme.mixins.toolbar` injects responsive minHeight (56~64px) and can make it look "too tall".
  minHeight: 45,
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

export const Drawer = styled(WiniDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  maxWidth: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflow: 'hidden',
  boxShadow: 'none',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0, 0, 0, 45),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth + 23}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '-79px',
  }),
}));

export const CustomListItem = styled(WiniListItem)(({ theme }) => ({
  cursor: 'pointer',
}));
