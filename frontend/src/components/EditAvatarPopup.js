import {useEffect, createRef} from 'react';
import {PopupWithForm} from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onSubmit}) {

  const avatarInputRef = createRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(avatarInputRef.current.value);
  }

  useEffect(() => {
    avatarInputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm name="edit-avatar" title="Обновить&nbsp;аватар" isOpen={isOpen} onClose={onClose}
                   onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input id="avatar-form__photo" ref={avatarInputRef} className="avatar-form__photo form__input"
               placeholder="Ссылка на аватар" name="avatar" defaultValue="" required type="url"
               pattern="(http|https|ftp|ftps|sftp|file)+://.+"/>
        <span className="avatar-form__photo-error form__input-error-msg"/>
      </fieldset>
    </PopupWithForm>
  );
}

export {EditAvatarPopup};