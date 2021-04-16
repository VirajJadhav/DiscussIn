import {
  DashBoard,
  Room,
  Login,
  Signup,
  Profile,
  AddRoom,
  JoinRoom,
} from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/signup" render={props => <Signup {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />

          <Route exact path="/" render={props => <DashBoard {...props} />} />
          <Route
            exact
            path="/join/:roomID"
            render={props => <Room {...props} />}
          />
          <Route
            exact
            path="/addRoom"
            render={props => <AddRoom {...props} />}
          />
          <Route
            exact
            path="/joinRoom"
            render={props => <JoinRoom {...props} />}
          />
          <Route
            exact
            path="/profile/:userName"
            render={props => <Profile {...props} />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
