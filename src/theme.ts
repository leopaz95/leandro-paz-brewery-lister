import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(180 83 9)',
    },
    background: {
      default: 'rgb(255 251 235)',
    },
    text: {
      primary: 'rgb(180 83 9)',
      secondary: 'black',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        body: {
          color: 'black',
        },
      },
    },
  },
});

export default theme;
