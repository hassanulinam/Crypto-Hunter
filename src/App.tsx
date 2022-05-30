import {
  createTheme,
  makeStyles,
  ThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SnackBarAlert from "./components/Authentication/SnackBarAlert";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";

const useStyles = makeStyles((theme: Theme) => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
        <SnackBarAlert />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
