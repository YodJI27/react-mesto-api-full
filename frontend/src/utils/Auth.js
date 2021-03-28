export const BASE_URL = "http://api.mesto.students.nomoredomains.club";

// Регистрация / авторизация пользователя
const authApi = (password, email, sign) => {
  console.log(`${BASE_URL}/${sign}`);
    return fetch(`${BASE_URL}/${sign}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  const authApiToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

export {authApiToken, authApi};
