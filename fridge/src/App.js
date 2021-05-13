import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import FirstSetup from "./pages/FirstSetup";
import UserProvider from "./providers/UserProvider";
import FridgeProvider from "./providers/FridgeProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <FridgeProvider>
      <UserProvider>
        <Router>
          <div style={{ height: "100vh" }}>
            <Switch>
              <Route path="/welcome">
                <Welcome />
              </Route>
              <Route path="/firstSetup">
                <FirstSetup />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </FridgeProvider>
  );
}

export default App;
