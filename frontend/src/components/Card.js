import {useContext} from "react";
import {hasItems, isDefined} from "../utils/predicates";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onDelete, onCardLike, onCardClick }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;

  let hasUserLike = false;
  if (isDefined(card.likes)) {
    hasUserLike = card.likes.some(owner => owner === currentUser._id);
  }

  const likeCount = hasItems(card.likes) ? card.likes.length : 0

  const handleCardClick = () => {
    onCardClick(card);
  }

  const handleCardLike = () => {
    onCardLike(card, !hasUserLike);
  }

   const handleCardDelete = () => {
    onDelete(card);
   }

  return (
    <>
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
      {isOwner &&
        <button className="element__trash-btn element__trash-btn_active" type="button" onClick={handleCardDelete} />
      }
      <div className="element__info">
        <h2 className="element__name abridgment">{card.name}</h2>
        <div className="element__like-group">
          <button className={`element__like-btn ${hasUserLike && 'element__like-btn_active'}`} type="button" onClick={handleCardLike}/>
          <p className="element__like-counter">{likeCount}</p>
        </div>
      </div>
    </>
  );
}

export { Card };
