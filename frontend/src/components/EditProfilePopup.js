import {PopupWithForm} from "./PopupWithForm";
import {useContext, useState, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onSubmit}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const onChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'occupation':
        setDescription(e.target.value);
        break;
      default:
        console.log(`Error! Unknown input name: ${e.target.name}`);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({name, about: description});
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="edit-profile" title="Редактировать&nbsp;профиль" isOpen={isOpen} onClose={onClose}
                   onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input id="profile-form__name" className="profile-form__name form__input" type="text" name="name"
               value={name || ''} onChange={onChange} required minLength="2" maxLength="40" placeholder="Имя"/>
        <span className="profile-form__name-error form__input-error-msg"/>
        <input id="profile-form__occupation" className="profile-form__occupation form__input" onChange={onChange}
               type="text" name="occupation" value={description || ''} required minLength="2" maxLength="200"
               placeholder="Работа"/>
        <span className="profile-form__occupation-error form__input-error-msg"/>
      </fieldset>
    </PopupWithForm>
  );
}

export {EditProfilePopup};