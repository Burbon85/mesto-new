export default class Api {
    constructor(config) {
        // тело конструктора
        this._url = config.baseUrl;
        this._headers = config.headers;
      }

    _getResponseData(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    
      _getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
        headers: {
        authorization: '68cde520-ac6c-40b9-a1ad-21ed7cb7863b'
        }
     })
         .then(this._getResponseData);
    }
   
      _getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: this._headers
        })
          .then(this._getResponseData);
      }

      getNeededAll() {
        return Promise.all([this._getUserInfo(), this._getInitialCards()]);
      }

      patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.about
          })
        })
        .then(this._getResponseData);
      }
    
      createNewCard(formValues) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: formValues.place,
            link: formValues.link
          })
        })
        .then(this._getResponseData);
      }
    
      deleteCard(cardId) {
        return fetch(`${this._url}${"/cards/"}${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
    
      putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
    
      deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
    
      changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar
          })
        })
        .then(this._getResponseData);
      }
}