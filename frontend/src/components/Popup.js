import { useEffect } from "react";

function Popup({ name, isOpen, onClose, children }) {

  const popupOpenStatusClass = isOpen ? "popup_opened" : "";

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === "Escape") { onClose(); }
    }
    document.addEventListener( 'keyup', closeOnEscapeKey);
    return () => document.removeEventListener('keyup', closeOnEscapeKey);
  });

  const preventCloseOnMousedown = (e) => e.stopPropagation();

  return (
    <div className={`popup popup_type_${name} ${popupOpenStatusClass}`} onMouseDown={onClose}>
      <div className="popup__container" onMouseDown={preventCloseOnMousedown}>
        <button className="popup__close-btn" type="button" onClick={onClose}/>
        {children}
      </div>
    </div>
  );
}

export { Popup };