import {
  DashBoard,
  Room,
  Login,
  Signup,
  Profile,
  AddRoom,
  JoinRoom,
} from "./pages";
import { Notification } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Notification />
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
          <ProtectedRoute
            exact={true}
            path="/profile/:userName"
            component={props => <Profile {...props} />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
