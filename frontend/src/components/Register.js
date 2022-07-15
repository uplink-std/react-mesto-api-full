import {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {routePaths} from "../utils/constants";

function Register({onSubmit}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        console.log(`Error! Unknown input name: ${e.target.name}`);
        break;
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <main className="content">
      <section className="auth">
        <form className={`form form_type_signup form_theme_dark`} name="signup" noValidate
              onSubmit={handleRegisterSubmit}>
          <h2 className="form__title form__title_theme_dark">Регистрация</h2>
          <fieldset className="form__fieldset">
            <input id="signup-form__email" className="signup-form__email form__input form__input_theme_black"
                   type="text" name="email"
                   value={email || ''} onChange={onChange} required minLength="2" maxLength="40" placeholder="Email"/>
            <span className="signup-form__email-error form__input-error-msg"/>
            <input id="signup-form__password" className="signup-form__password form__input form__input_theme_black"
                   onChange={onChange}
                   type="password" name="password" value={password || ''} required minLength="2" maxLength="200"
                   placeholder="Пароль"/>
            <span className="signup-form__password-error form__input-error-msg"/>
          </fieldset>
          <button className="form__save-btn form__save-btn_theme_black" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="auth__signin-hint">
          <span className="auth__signin-hint-text">Уже зарегистрированы?</span>
          <Link className="auth__signin-hint-link" to={routePaths.signIn}>Войти</Link>
        </div>
      </section>
    </main>
  );
}

export default withRouter(Register);