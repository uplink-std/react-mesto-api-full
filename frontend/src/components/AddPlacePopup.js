import {useEffect, useState} from 'react';
import {PopupWithForm} from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onSubmit}) {

  const [formData, setFormData] = useState({name: '', link: ''});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.name, formData.link);
  }

  const handleChange = (e) => {
    const newState = {...formData};
    newState[e.target.name] = e.target.value;
    setFormData(newState);
  }

  useEffect(() => {
    setFormData({name: '', link: ''});
  }, [isOpen]);

  return (
    <PopupWithForm name="add-card" title="Новое&nbsp;место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input id="card-form__name" className="card-form__name form__input" type="text" placeholder="Название"
               name="name" value={formData.name} onChange={handleChange} required minLength="2" maxLength="30"/>
        <span className="card-form__name-error form__input-error-msg"/>
        <input id="card-form__photo" className="card-form__photo form__input" placeholder="Ссылка на картинку"
               name="link" value={formData.link} onChange={handleChange} required type="url"
               pattern="(http|https|ftp|ftps|sftp|file)+://.+"/>
        <span className="card-form__photo-error form__input-error-msg"/>
      </fieldset>
    </PopupWithForm>
  );
}

export {AddPlacePopup};