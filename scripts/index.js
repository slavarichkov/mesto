const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const saveButton = document.querySelector('.popup__button')
const closeIkon = document.querySelector('.popup__closeikon')
const profileFirstname = document.querySelector('.profile__firstname')
const firstnameInput = document.querySelector('.popup__input_field_firstname')
const professionInput = document.querySelector('.popup__input_field_profession')
const profileSubtext = document.querySelector('.profile__subtext')

editButton.addEventListener('click', function () {
    popup.classList.add('popup_open')
    firstnameInput.value = profileFirstname.textContent;
    professionInput.value = profileSubtext.textContent;
})

function closePopUp() {
    popup.classList.remove('popup_open')
}

saveButton.addEventListener('submit', function (event) {
    event.preventDefault();
    closePopUp;
    profileFirstname.textContent = firstnameInput.value;
    profileSubtext.textContent = professionInput.value;
})

closeIkon.addEventListener('click', closePopUp)
        
