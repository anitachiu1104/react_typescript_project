import { alpha, createTheme } from '@mui/material';

declare module '@mui/material/styles' {}

const dividerColor = '#F2F2F2';
const secondaryMain = '#B0E0E6';
const secondaryContrastText = '#FFF';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#B0E0E6',
      light: '#F0FFFF',
      contrastText: '#FFF',
    },
    secondary: {
      main: secondaryMain,
      contrastText: secondaryContrastText,
    },
    background: {
      default: '#F0FFFF',
    },
    text: {
      primary: '#424166',
      secondary: '#A8B2C4',
    },
    divider: dividerColor,
  },
  typography: {},
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: {
          verticalAlign: 'middle',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'unset',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '14px 40px',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 30,
          fontSize: 20,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: 16,
          fontSize: '1rem',
          color: '#A8B2C4',
          fontWeight: 500,
          lineHeight: 1,
          backgroundColor: alpha('#F0FFFF', 0.8),
          '&': {
            ':first-of-type': {
              borderRadius: '8px 0 0 8px',
            },
            ':last-of-type': {
              borderRadius: '0 8px 8px 0',
            },
          },
        },
        body: {
          borderBottom: `1px solid ${dividerColor}`,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${dividerColor}`,
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 16,
          marginRight: 16,
          textTransform: 'unset',
          minWidth: 'unset',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '10px 20px',
          lineHeight: 1,
          '&.Mui-selected': {
            color: secondaryContrastText,
            backgroundColor: secondaryMain,
            '&:hover': {
              backgroundColor: secondaryMain,
            },
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        rectangular: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default defaultTheme;
