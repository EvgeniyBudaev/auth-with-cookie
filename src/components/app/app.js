import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
// import Login from '../login';
// import Dashboard from '../dashboard';
import AuthApi from '../auth-api/auth-api';
import Cookies from 'js-cookie';

const App = () => {
  const [auth, setAuth] = React.useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])

  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  )
}

const Login = () => {

  const Auth = React.useContext(AuthApi);

  const handlerOnClick = () => {
    Auth.setAuth(true);
    Cookies.set("user", "loginTrue")
  }
  return (
    <div>
      <h1>Авторизация с cookie</h1>
      <button onClick={handlerOnClick}>Войти</button>
    </div>
  )
}

const Dashboard = () => {

  const Auth = React.useContext(AuthApi);

  const handlerOnClick = () => {
    Auth.setAuth(false);
    Cookies.remove("user");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handlerOnClick}>Выйти</button>
    </div>
  )
}

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <Switch>
      <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />
      <ProtectedRoute path="/dashboard" auth={Auth.auth} component={Dashboard} />
    </Switch>
  )
}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
      <Component />
    ) :
        (
          <Redirect to="/login" />
  )
}
    />
  )
}

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      ) :
        (
          <Redirect to="/dashboard" />
        )
      }
    />
  )
}

export default App;