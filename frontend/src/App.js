import { DashBoard } from "./pages";
import { NavBar } from "./components";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={props => <DashBoard theme={theme.palette} {...props} />}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
