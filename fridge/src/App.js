import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProvider from "./providers/UserProvider";
import FridgeProvider from "./providers/FridgeProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ height: "100vh" }}>
          <Switch>
            <Route path="/start">
              <FridgeProvider>
                <Home />
              </FridgeProvider>
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
