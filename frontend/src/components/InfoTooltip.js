import {Popup} from "./Popup";
import successImage from './../images/success.svg';
import failImage from './../images/fail.svg';

function InfoTooltip({name, isOpen, onClose, success}) {
  let image = failImage;
  let message = (<>Что-то&nbsp;пошло&nbsp;не&nbsp;так!<br/>Попробуйте&nbsp;ещё&nbsp;раз.</>);

  if (success) {
    image = successImage;
    message = (<>Вы&nbsp;успешно<br/>зарегистрировались!</>);
  }

  return (<Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <img className="info-tooltip__image" src={image} alt={message || ''}/>
        <p className="info-tooltip__message">{message}</p>
      </div>
    </Popup>);
}

export {InfoTooltip};