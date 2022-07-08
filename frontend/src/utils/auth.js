const httpVerbs = {
    post: "POST",
    get: "GET",
    patch: "PATCH",
    put: "PUT",
    delete: "DELETE"
}

const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json; charset=utf-8",
};

class AuthApi {

    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    signup({ email, password}) {
        const request = {
            method: httpVerbs.post,
            headers: {...headers},
            body: JSON.stringify({ email, password })
        }

        return fetch(this._makeResourceUrl("signup"), request)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              if (response.status === 400) {
                  return Promise.reject("некорректно заполнено одно из полей");
              }
              return Promise.reject(`Ошибка: код=${response.status} текст=${response.statusText}`);
          })
          .then((jsonResponse) => Promise.resolve(jsonResponse.data));
    }

    signin({ email, password}) {
        const request = {
            method: httpVerbs.post,
            headers: {...headers},
            body: JSON.stringify({ email, password })
        };

        return fetch(this._makeResourceUrl("signin"), request)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              if (response.status === 400) {
                  return Promise.reject("не передано одно из полей");
              }
              if (response.status === 401) {
                  return Promise.reject("пользователь с email не найден");
              }
              return Promise.reject(`Ошибка: код=${response.status} текст=${response.statusText}`);
          });
    }

    inspectToken() {

        const request = {
            method: httpVerbs.get,
            headers: this._setAuthHeaders(headers)
        }

        return fetch(this._makeResourceUrl("users/me"), request)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }

              if (response.status === 400) {
                  return Promise.reject("Токен не передан или передан не в том формате");
              }
              if (response.status === 401) {
                  return Promise.reject("Переданный токен некорректен");
              }
              return Promise.reject(`Ошибка: код=${response.status} текст=${response.statusText}`);
          });
    }

    signout() {
      const request = {
        method: httpVerbs.post,
        headers: this._setAuthHeaders(headers)
      }

      return fetch(this._makeResourceUrl("signout"), request)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        });
    }

    _makeResourceUrl(resource) {
        return `${this._baseUrl}/${resource}`;
    }

    _setAuthHeaders(headers) {
        return {
            ...headers,
            "Authorization": `Bearer ${this._token}`
        };
    }
}

const authApi = new AuthApi({
    baseUrl: "https://mesto.nomorepartiesxyz.ru/api"
});

export { authApi };
