import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { ToastContainer } from "react-toastify";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeButton={false}
      />
    </div>
  );
}

export default App;
