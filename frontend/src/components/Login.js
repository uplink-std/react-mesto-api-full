import {useState} from "react";
import {withRouter} from "react-router-dom";

function Login({onSubmit}) {

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <main className="content">
      <section className="auth">
        <form className={`form form_type_signin form_theme_dark form_with-spacer`} name="signin" noValidate onSubmit={handleLoginSubmit}>
          <h2 className="form__title form__title_theme_dark">Вход</h2>
          <fieldset className="form__fieldset">
            <input id="signin-form__email" className="signin-form__email form__input form__input_theme_black"
                   type="text" name="email"
                   value={email || ''} onChange={onChange} required minLength="2" maxLength="40" placeholder="Email"/>
            <span className="signin-form__email-error form__input-error-msg"/>
            <input id="signin-form__password" className="signin-form__password form__input form__input_theme_black"
                   onChange={onChange}
                   type="password" name="password" value={password || ''} required minLength="2" maxLength="200"
                   placeholder="Пароль"/>
            <span className="signin-form__password-error form__input-error-msg"/>
          </fieldset>
          <button className="form__save-btn form__save-btn_theme_black" type="submit">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default withRouter(Login);
