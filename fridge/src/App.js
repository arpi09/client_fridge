import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import UserProvider from "./providers/UserProvider";
import LoadingProvider from "./providers/LoadingProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
