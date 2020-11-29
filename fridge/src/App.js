import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProvider from "./providers/UserProvider";
import LoadingProvider from "./providers/LoadingProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <Router>
          <div style={{ height: "100vh" }}>
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
