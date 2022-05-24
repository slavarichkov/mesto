const editButton = document.querySelector('.edit-button') 
const popup = document.querySelector('.popup')
const saveButton = document.querySelector('.button')
const closeIkon = document.querySelector('.closeIkon')
const profileFirstname = document.querySelector('.profile__firstname')
const firstnameInput = document.querySelector('.form__input_firstname')
const professionInput = document.querySelector('.form__input_profession')
const profileSubtext = document.querySelector('.profile__subtext')

editButton.addEventListener('click', function() {
    popup.classList.add('popup_open')
    firstnameInput.value = profileFirstname.textContent;
    professionInput.value = profileSubtext.textContent;
})

saveButton.addEventListener('click', function() {
    popup.classList.remove('popup_open')
    profileFirstname.textContent = firstnameInput.value;
    profileSubtext.textContent = professionInput.value;
})

closeIkon.addEventListener('click', function() {
    popup.classList.remove('popup_open')
})

console.log(profileFirstname)