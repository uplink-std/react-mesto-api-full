import {useContext} from "react";
import {Card} from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <span className="profile__edit-cover" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name}/>
        </span>
        <div className="profile__info">
          <h1 className="profile__info-name abridgment">{currentUser.name}</h1>
          <p className="profile__info-occupation abridgment">{currentUser.about}</p>
          <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) =>
            <li key={card._id} className="element">
              <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onDelete={onCardDelete}/>
            </li>
          )}
        </ul>
      </section>

    </main>
  );
}

export {Main};
