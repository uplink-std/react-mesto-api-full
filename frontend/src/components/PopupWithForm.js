import {Popup} from "./Popup";

function PopupWithForm({title, name, isOpen, onClose, onSubmit, saveCaption = "Сохранить", children}) {

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form className={`form form_type_${name}`} name={name} noValidate onSubmit={onSubmit}>
        <h2 className="form__title">{title}</h2>
        {children}
        <button className="form__save-btn" type="submit">
          {saveCaption}
        </button>
      </form>
    </Popup>
  );
}

export {PopupWithForm};