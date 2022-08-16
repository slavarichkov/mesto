class Api {
    constructor(host, token) {
        this.host = host;
        this.token = token;
    }

    // проверка статуса запроса
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(
                `ошибка: ${res.status} - ${res.statusText}`
            );
        }
    }


    // запрос данных пользователя
    getUserInfo() {
        return fetch(`${this.host}users/me`, {
            headers: {
                authorization: this.token,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status} - ${res.statusText}`
                );
            }
        })
    }

    // отправка данных пользователя
    sendUserInfo(data) {
        return fetch(`${this.host}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.firstname, about: data.profession }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }

    //запрос изображений с сервера 
    getImages() {
        return fetch(`${this.host}cards`, {
            headers: {
                authorization: this.token,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }

    // отправка изображений на сервер 
    sendImages(data) {
        return fetch(`${this.host}cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.image_title, link: data.link }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }

    //смена аватара(отправка на сервер)
    sendAvatar(data) {
        return fetch(`${this.host}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: data.link }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }

    //удалить карточку
    deleteCard(data) {
        // console.log(this.host);
        // console.log(this.token);
        // console.log(this);
        return fetch(`${this.host}cards/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }

    //поставить лайк 
    addLike(data) {
        return fetch(`${this.host}cards/${data}/likes `, {
            method: 'PUT',
            headers: {
                authorization: this.token,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }

    //удалить лайк
    deleteLike(data) {
        return fetch(`${this.host}cards/${data}/likes `, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `Упс: ${res.status}`
                );
            }
        });
    }
}


export default Api;