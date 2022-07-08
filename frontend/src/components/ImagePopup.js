import {Popup} from "./Popup";
import React from "react";

function ImagePopup({ name, image, imageName, isOpen, onClose }) {

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="card-details">
        <img className="card-details__photo" src={image} alt={imageName} />
        <p className="card-details__name">{imageName}</p>
      </div>
    </Popup>
  );
}

export { ImagePopup };