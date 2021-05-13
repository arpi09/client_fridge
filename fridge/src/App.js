import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProvider from "./providers/UserProvider";
import FridgeProvider from "./providers/FridgeProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Switch>
          <FridgeProvider>
            <UserProvider>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </UserProvider>
          </FridgeProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
