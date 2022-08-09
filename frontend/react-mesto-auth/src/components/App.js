import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
	const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [card, setCard] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');
	const [successfully, setSuccessfully] = useState(false);
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const history = useHistory();

	const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isRegistrationPopupOpen;

	useEffect(() => {
		function closeByEscape(evt) {
			if (evt.key === 'Escape') {
				closeAllPopups();
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', closeByEscape);
			return () => {
				document.removeEventListener('keydown', closeByEscape);
			}
		}
	}, [isOpen])

	useEffect(() => {
		api.getDataCards()
			.then(data => {
				setCards([...cards, ...data])
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	useEffect(() => {
		api.getDataProfile()
			.then(data => {
				setCurrentUser(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	useEffect(() => {
		tokenCheck()
	}, [])

	function tokenCheck() {
		const token = localStorage.getItem('token');
		if (token) {
			auth.validateToken(token)
				.then(data => {
					if (data) {
						setLoggedIn(true)
						history.push('/');
						setEmail(data.data.email);
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api.toggleLike(card._id, isLiked).then((newCard) => {
			setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
		})
			.catch(err => {
				console.log(err)
			})
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleDeleteCardClick(card) {
		setCard(card);
		setIsDeleteCardPopupOpen(true);
	}

	function handleUpdateUser(data) {
		setIsLoading(true);
		api.updateDataProfile(data)
			.then(data => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleUpdateAvatar(data) {
		setIsLoading(true);
		api.updateAvatar(data)
			.then(data => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleAddCard(data) {
		setIsLoading(true);
		api.addNewCard(data)
			.then(data => {
				setCards([data, ...cards]);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function closeAllPopups() {
		isEditProfilePopupOpen && setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
		isAddPlacePopupOpen && setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
		isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
		isDeleteCardPopupOpen && setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen)
		isRegistrationPopupOpen && setIsRegistrationPopupOpen(!isRegistrationPopupOpen)
		selectedCard && setSelectedCard(null)
	}

	function handleCardClick(obj) {
		setSelectedCard(obj);
	}

	function clickBurger() {
		setIsBurgerOpen(!isBurgerOpen);
	}

	function closeBurger() {
		setIsBurgerOpen(false);
	}

	function authorization(password, email) {
		auth.authorize(password, email)
			.then(data => {
				localStorage.setItem('token', data.token);
				setEmail(email)
				setLoggedIn(true);
				history.push('/')
			})
			.catch(() => {
				setSuccessfully(false)
				setIsRegistrationPopupOpen(true)
			})
	}

	function registration(password, email) {
		auth.register(password, email)
			.then(res => {
				if (res) {
					history.push('/sign-in')
					setSuccessfully(true)
				}
			})
			.catch(() => {
				setSuccessfully(false)
			})
			.finally(() => {
				setIsRegistrationPopupOpen(true)
			})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className={`page ${isBurgerOpen ? "menu-open" : ""}`}>
				<Route exact path="/">
					<Header email={email} onClickBurger={clickBurger} onCloseBurger={closeBurger} />
				</Route>
				<Switch>
					<Route path="/sign-up">
						<Header />
						<Register onRegistration={registration} />
					</Route>
					<Route path="/sign-in">
						<Header />
						<Login onAuthorization={authorization} />
					</Route>
					<ProtectedRoute
						exact path='/'
						loggedIn={loggedIn}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onEditAvatar={handleEditAvatarClick}
						onEditDeleteCard={handleDeleteCardClick}
						onCardClick={handleCardClick}
						cards={cards}
						onCardLike={handleCardLike}
						component={Main}
					/>
				</Switch>
				<Route exact path="/">
					<Footer />
				</Route>
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddCard={handleAddCard}
					isLoading={isLoading}
				/>
				<DeleteCardPopup
					isOpen={isDeleteCardPopupOpen}
					onClose={closeAllPopups}
					onDeleteCard={handleCardDelete}
					card={card}
					isLoading={isLoading}
				/>
				<InfoTooltip
					isOpen={isRegistrationPopupOpen}
					onClose={closeAllPopups}
					isSuccessfully={successfully}
				/>
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
