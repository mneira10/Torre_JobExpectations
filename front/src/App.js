import SearchJob from "./SearchJob/SearchJob";
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@material-ui/core";
import "./App.css";
const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <SearchJob />
    </MuiThemeProvider>
  );
}

export default App;
