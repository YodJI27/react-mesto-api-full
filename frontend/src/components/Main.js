import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Footer from "./Footer";

const Main = (props) => {
  const { name, avatar, about } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar_box">
          <img className="profile__image" src={avatar} alt="Аватар"></img>
          <button
            className="profile__avatar"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__button">
            <h1 className="profile__author">{name}</h1>
            <button
              className="profile__edit profile__edit_open_popup"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              CardClick={props.onCardClick}
              key={card._id}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          );
        })}
      </section>
      <Footer />
    </main>
  );
};

export default Main;
