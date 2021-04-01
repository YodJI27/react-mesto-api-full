class Api {
  constructor(data) {
    this._url = data.url;
  }

  // Информация о пользователе
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      },
    }).then(this._checkStatus);
  }
  // Добавление карточек с сервера
  receiveCardsInServer() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      },
    }).then(this._checkStatus);
  }
  // Добавление карточек из попап
  upCardsToTheServer(names, links) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: names,
        link: links,
      }),
    }).then(this._checkStatus);
  }
  // Редактирование информации о пользователе
  editInfoUser(names, links) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: names,
        about: links,
      }),
    }).then(this._checkStatus);
  }
  // Удаление карточки
  deleteCards(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      },
    }).then(this._checkStatus);
  }
  // Редактирование аватара
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._checkStatus);
  }
  // Постановка и удаление лайка
  putLikes(id, checkCard) {
    if (checkCard) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "content-type": "application/json",
        },
      }).then(this._checkStatus);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "content-type": "application/json",
        },
      }).then(this._checkStatus);
    }
  }
  // Проверка на ошибки
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
const api = new Api({
  url: "https://api.mesto.students.nomoredomains.club",
});

export default api;
