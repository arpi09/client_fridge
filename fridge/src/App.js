import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import UserProvider from "./providers/UserProvider";
import FridgeProvider from "./providers/FridgeProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ height: "100vh" }}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <FridgeProvider>
                <Home />
              </FridgeProvider>
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
