import logoImage from "../images/logo.svg";
import {Link, useRouteMatch} from "react-router-dom";
import {routePaths} from "../utils/constants";

function Header({onSignOut, isLoggedIn, email}) {

  const handleSignOut = () => {
    onSignOut();
  }

  const getButton = (isSignInPage) => {
    if (isLoggedIn) {
      return (
        <button className="header__user-auth-btn" to={routePaths.signOut} onClick={handleSignOut}>Выйти</button>
      );
    }
    if (isSignInPage) {
      return (
        <Link className="header__user-auth-btn" to={routePaths.signUp}>Регистрация</Link>
      );
    }
    return (
      <Link className="header__user-auth-btn" to={routePaths.signIn}>Войти</Link>
    )
  }

  const isAtSignInPage = useRouteMatch(routePaths.signIn);
  const authButton = getButton(isAtSignInPage);

  return (
    <header className="header">
      <img className="header__logo" src={logoImage} alt="логотип mesto"/>
      <div className="header__user">
        <span className="header__user-email">{email}</span>
        {authButton}
      </div>
    </header>
  );
}

export {Header};
