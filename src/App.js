import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { projectAuth } from "./config/firebaseConfig";
import { useDispatch } from "react-redux";
import { set_auth } from "./features/user";

function App() {
  const user = useSelector((state) => state.user.userData);
  const authIsReady = useSelector((state) => state.user.authIsReady);
  const dispatch = useDispatch();

  /*Communicate with Firebase if 
  there are changes in the authentication*/
  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      dispatch(set_auth());
      unsubscribe();
    });
  }, []);

  console.log("dsds", user);

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
