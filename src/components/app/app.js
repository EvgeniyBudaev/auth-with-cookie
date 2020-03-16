import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import AuthApi from "../auth-api/auth-api";
import Cookies from "js-cookie";
import TestartURL from "./testart-url";

const App = () => {
  const [auth, setAuth] = React.useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  };

  React.useEffect(() => {
    readCookie();
  }, []);

  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  );
};

const Login = () => {
  const Auth = React.useContext(AuthApi);

  const handlerOnClick = () => {
    Auth.setAuth(true);
    Cookies.remove("ulogin_token", "ue0bed434f6e522c4c35e7e5141473101");
    Cookies.remove("_csrf");
    Cookies.set(
      "_identity",
      "b1063fa405e89a118a33cc3f8544c92dce0bb4f6a3d57835b5b165141acb9506a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A50%3A%22%5B56674%2C%227SeJn00FyrFNictZcnC9ygfC4uAs4gi5%22%2C2592000%5D%22%3B%7D"
    );
  };
  return (
    <div>
      <h1>Авторизация с cookie</h1>
      <button onClick={handlerOnClick}>Войти</button>
    </div>
  );
};

const Dashboard = () => {
  const Auth = React.useContext(AuthApi);

  const handlerOnClick = () => {
    Auth.setAuth(false);
    Cookies.remove("_identity");
    Cookies.remove("_csrf");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handlerOnClick}>Выйти</button>
    </div>
  );
};

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <Switch>
      <ProtectedLogin path="/auth" auth={Auth.auth} component={Login} exact />
      <ProtectedRoute path="*" auth={Auth.auth} component={TestartURL} exact />
    </Switch>
  );
};

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/auth" />)}
    />
  );
};

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default App;
