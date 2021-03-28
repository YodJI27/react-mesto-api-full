import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  // Получение контекста
  const currentUser = useContext(CurrentUserContext);

  // Сравниваем свой id с id карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Проверка на удаление карточки (в className)
  const cardDeleteButtonClassName = `cards__delete ${
    isOwn ? "" : "cards__delete_inactive"
  }`;

  // Проверка поставили лайк или нет
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Отображение лайка (в className)
  const cardLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_active" : ""
  }`;

  // Клик по картинке
  function handleClick() {
    props.CardClick(props.card);
  }
  // Отслеживание лайков
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  // Удаление карточки
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="cards__item">
      <img
        className="cards__image"
        src={props.card.link}
        alt=""
        onClick={handleClick}
      ></img>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__info">
        <h2 className="cards__text">{props.card.name}</h2>
        <div className="cards__container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__like_count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
