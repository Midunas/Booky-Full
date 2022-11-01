import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'light' });

const ColorModeContextProvider = ({ children }) => {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: "#d3def7"
          },
          primary: {
            main: "#ffffff"
          },
          secondary: {
            main: '#9333ea'
          },

        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default ColorModeContextProvider;