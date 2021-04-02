import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      id="edit__popup"
    >
      <form method="POST" className="popup__container" name={props.name}>
        <h2 className="popup__heading">{props.title}</h2>
        {props.children}
        <button
          type="reset"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </form>
    </section>
  );
}
export default PopupWithForm;
