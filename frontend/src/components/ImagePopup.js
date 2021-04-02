import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup photo ${props.card.status ? "popup_opened" : ""}`}
    >
      <div className="photo__container">
        <img className="photo__image" src={props.card.links} alt=""></img>
        <p className="photo__text">{props.card.title}</p>
        <button
          type="reset"
          className="popup__close photo__close"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}
export default ImagePopup;
