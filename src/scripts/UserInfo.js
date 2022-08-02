export default class UserInfo {
    constructor(selectorName, selectorProffesion) {
        this._userName = document.querySelector(selectorName);
        this._userProffesion = document.querySelector(selectorProffesion);
    }

    //возвращает объект с данными пользователя
    getUserInfo(name, proffesion) {
        this._userName.value = name;
        this._userProffesion.value = proffesion;
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, proffesion) {
        proffesion.textContent = this._userProffesion.value;
        name.textContent = this._userName.value;
    }
}