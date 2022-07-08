import {isDefined} from "./predicates";

class Api {

    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
        this._headers = {
            "Content-Type": "application/json; charset=utf-8"
        };
    }

    /**
     * 1. Загрузка информации о пользователе с сервера
     * GET https://nomoreparties.co/v1/{cohortId}/users/me
     */
    getUserInfo() {
        return this._read("users/me");
    }

    /**
     * 2. Загрузка карточек с сервера
     * GET https://mesto.nomoreparties.co/v1/{cohortId}/cards
     */
    getCards() {
        return this._read("cards");
    }

    /**
     * 3. Редактирование профиля
     * PATCH https://mesto.nomoreparties.co/v1/{cohortId}/users/me
     */
    updateUserInfo({ name, about }) {
        return this._updatePartially("users/me", { name, about });
    }

    /**
     * 4. Добавление новой карточки
     * POST https://mesto.nomoreparties.co/v1/{cohortId}/cards
     */
    createCard({ name, link }) {
        return this._create("cards", { name, link });
    }

    /**
     * 7. Удаление карточки
     * DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
     */
    deleteCard(cardId) {
        return this._delete(`cards/${cardId}`);
    }

    /**
     * 8. Постановка и снятие лайка
     * PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
     * DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
     */
    setLike(isLiked, cardId) {
        if (isLiked) {
            return this._update(`cards/${cardId}/likes`);
        }
        return this._delete(`cards/${cardId}/likes`);
    }

    /**
     * 9. Обновление аватара пользователя
     * PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar
     */
    updateUserAvatar(avatarUrl) {
        return this._updatePartially(`users/me/avatar`, { avatar: avatarUrl });
    }

    _create(resource, data) {
        return this._callApi('POST', resource, data);
    }

    _read(resource) {
        return this._callApi('GET', resource);
    }

    _updatePartially(resource, data) {
        return this._callApi('PATCH', resource, data);
    }

    _update(resource, data) {
        return this._callApi('PUT', resource, data);
    }

    _delete(resource) {
        return this._callApi('DELETE', resource);
    }

    _callApi(method, resource, data) {
        const request = { method: method, headers: this._headers }

        if (isDefined(data)) {
            request.body = JSON.stringify(data);
        }

        return fetch(`${this._baseUrl}/${resource}`, request)
          .then(this._getAsJson)
          .catch(this._rejectWithError);
    }

    _getAsJson(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`ERROR: code=${response.status} msg=${response.statusText}`);
    }

    _rejectWithError(error) {
        return Promise.reject(`ERROR: ${error}`)
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomorepartiesxyz.ru/api"
});

export { api };
