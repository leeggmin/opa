import { StrictMode } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { appTheme } from '@/shared/config/theme';
import '@/shared/lib/chartjs';
import './styles/index.css';
import { AppProvider } from './providers';
import { AppRouter } from './router';
import { GlobalLayout } from './layouts/GlobalLayout';

function App() {
  return (
    <StrictMode>
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <ThemeProvider theme={appTheme}>
          <AppProvider>
            <GlobalLayout>
              <AppRouter />
            </GlobalLayout>
          </AppProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  );
}

export default App;
