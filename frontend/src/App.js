import { DashBoard, Room, Login } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <DashBoard theme={theme.palette} {...props} />}
          />
          <Route
            exact
            path="/join"
            render={props => <Room theme={theme.palette} {...props} />}
          />
          <Route exact path="/login" render={props => <Login {...props} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
