import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const handleChangeName = (evt) => {
    setCardName(evt.target.value);
  };
  const handleChangeLink = (evt) => {
    setCardLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace(cardName, cardLink);
  };

  return (
    <PopupWithForm
      name="popup_cards"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__label">
        <input
          type="text"
          id="input-name"
          value={cardName || ""}
          name="name"
          placeholder="Название"
          className="popup__text popup__text_name_cards"
          required
          maxLength="30"
          minLength="2"
          onChange={handleChangeName}
        ></input>
        <span className="popup__error" id="input-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          id="url-input"
          name="link"
          value={cardLink || ""}
          placeholder="Ссылка на картинку"
          className="popup__text popup__text_job_cards"
          required
          onChange={handleChangeLink}
        ></input>
        <span className="popup__error" id="url-input-error"></span>
      </label>
      <button
        type="submit"
        className="popup__button popup__button_save_form"
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
