import edit from '../images/profile/edit.svg';
import plus from '../images/profile/plus.svg';
import redaction from '../images/profile/redaction.svg';
import Card from './Card';
import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__avatar" onClick={props.onEditAvatar}>
					<img src={currentUser.avatar} alt='Аватар' className="profile__avatar-image" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
					<div className="profile__hover">
						<div className="profile__overlay"></div>
						<img src={redaction} alt="Редактировать"
							className="profile__redaction-icon" />
					</div>
				</div>
				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<button className="profile__edit-button" onClick={props.onEditProfile}>
						<img src={edit} alt="Редактировать" className="profile__pen" />
					</button>
					<p className="profile__text">{currentUser.about}</p>
				</div>
				<button className="profile__add-button" onClick={props.onAddPlace}>
					<img src={plus} alt="Плюс" className="profile__plus" />
				</button>
			</section>
			<section className="elements">
				{props.cards.map((card) => (
					<Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike={props.onCardLike} onEditDeleteCard={props.onEditDeleteCard} />
				))}
			</section>
		</main>
	)
}

export default Main;