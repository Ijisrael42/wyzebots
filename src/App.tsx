import Routes from "./routes";
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';

function App() {
 
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes/>
      </ThemeProvider>
    </StyledEngineProvider>
    );
}

export default App;
