export default class UserInfo {
    constructor(name, proffesion) {
        this._userName = document.querySelector(name);
        this._userProffesion = document.querySelector(proffesion);
    }

    //возвращает объект с данными пользователя со страницы для добавления в попап при открытии
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userProffesion: this._userProffesion.textContent
        }
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, proffesion) {
        this._userName.textContent = name;
        this._userProffesion.textContent = proffesion;
    }

}