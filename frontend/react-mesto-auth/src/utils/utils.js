import { submitProfile, popupInputName, popupInputAbout, userInfo, submitAddCard, obj, profileAbout, profileName, profileAvatar, submitRedactionAvatar } from "./constants.js";
import { popupEditProfile, popupCreateCard, validatorFormAddCard, popupWithImage, popupWithDeleteCard, api, validatorFormAvatar, popupRedAvatar } from "../../pages/index.js";
import Card from "../components/Card.js"

// фуцнкции для класса Card
export function createCard(item) {
  return new Card({ item, handleCardClick, openPopupDeleteCard, serverAddLike, serverRemoveLike }, '#add-card').generatedCard();
}

function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

function openPopupDeleteCard(card, cardId) {
  popupWithDeleteCard.open(card, cardId);
}

function serverAddLike(cardId) {
  return api.addLike(cardId)
}

function serverRemoveLike(cardId) {
  return api.deleteLike(cardId)
}

// функция открытия попапа и заполнения полей профиля
export function addValuesInInputs() {
  const objValues = userInfo.getUserInfo();
  popupInputName.value = objValues.name;
  popupInputAbout.value = objValues.info;
  popupEditProfile.open();
}

// функция удаления карточки
export function handleDeleteCard(cardId) {
  return api.deleteCard(cardId);
}

// функция открытия попапа с изменением аватара
export function openRedactionAvatarPopup() {
  popupRedAvatar.open();
  validatorFormAvatar.disableSubmitButton(submitRedactionAvatar, obj.inactiveButtonClass);
}

// функция открытия попапа с добавлением карточки
export function openCreateCardPopup() {
  popupCreateCard.open();
  validatorFormAddCard.disableSubmitButton(submitAddCard, obj.inactiveButtonClass);
}

// функция инициализавция подгруженных с сервера данных профиля
export function initLoadDataProfile(data) {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  profileAvatar.src = data.avatar;
}

// функция переработки подруженных с сервера данных о карточках
export function createArrCardsFromServer(data, userId) {
  const loadCards = [];
  data.forEach(card => {
    const obj = {};
    obj.name = card.name;
    obj.link = card.link;
    obj.likes = card.likes.length;
    obj.cardId = card._id;
    obj.isYourLike = checkArrWithLikes(card.likes, userId);
    obj.isCreator = userId === card.owner._id ? true : false;
    loadCards.push(obj);
  })
  return loadCards;
}

// проверка для лайка
function checkArrWithLikes(arrs, id) {
  return arrs.some(arr => {
    return arr._id === id;
  })
}


export function renderLoading(text, selector) {
  selector.textContent = text;
}
