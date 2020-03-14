import React from 'react';
import AuthApi from '../auth-api/auth-api';
import Cookies from 'js-cookie';

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

export default Login;