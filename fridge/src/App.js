import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import UserProvider from "./providers/UserProvider";
import FridgeProvider from "./providers/FridgeProvider";
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
                <FridgeProvider>
                  <Home />
                </FridgeProvider>
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
