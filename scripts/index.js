const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const closeButton = document.querySelector('.popup__close-button');
const profileFirstname = document.querySelector('.profile__firstname');
const firstnameInput = document.querySelector('.popup__input_field_firstname');
const professionInput = document.querySelector('.popup__input_field_profession');
const profileSubtext = document.querySelector('.profile__subtext');


function closePopUp() {
    popup.classList.remove('popup_open')
}

editButton.addEventListener('click', function () {
    popup.classList.add('popup_open')
    firstnameInput.value = profileFirstname.textContent;
    professionInput.value = profileSubtext.textContent;
})

popupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        profileFirstname.textContent = firstnameInput.value;
        profileSubtext.textContent = professionInput.value;
        closePopUp();
    })

closeButton.addEventListener('click', closePopUp)
        
