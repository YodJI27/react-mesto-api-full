import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [UserName, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(
    (_) => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    },
    [currentUser]
  );

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };
  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser(UserName, description);
  };

  return (
    <PopupWithForm
      name="popup"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__label">
        <input
          id="name-input"
          type="text"
          name="name"
          className="popup__text popup__text_name_input"
          required
          maxLength="40"
          minLength="2"
          value={UserName || ""}
          onChange={handleChangeName}
        ></input>
        <span className="popup__error" id="name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          id="job-input"
          type="text"
          name="job"
          className="popup__text popup__text_job_input"
          required
          maxLength="200"
          minLength="2"
          value={description || ""}
          onChange={handleChangeDescription}
        ></input>
        <span className="popup__error" id="job-input-error"></span>
      </label>
      <button
        type="submit"
        className="popup__button popup__button_form_save"
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
