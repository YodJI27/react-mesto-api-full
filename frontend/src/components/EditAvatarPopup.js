import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const urlRef = useRef("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar(urlRef.current.value);
  };

  return (
    <PopupWithForm
      name="popup__avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__label">
        <input
          type="url"
          id="url-input"
          name="link"
          placeholder="Ссылка на аватар"
          className="popup__text popup__text_avatar"
          required
          ref={urlRef}
        ></input>
        <span className="popup__error" id="url-input-error"></span>
      </label>
      <button
        type="submit"
        className="popup__button popup__button_avatar_form"
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
