import deleteUrn from '../images/elements/delete.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';
import React, { useContext } from 'react';

function Card(props) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
		`element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
	);
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = `element__like element__like_disabled ${isLiked && 'element__like_active'}`;

	function handleClick() {
		props.onCardClick({ link: props.card.link, name: props.card.name });
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	function handleDeleteClick() {
		props.onEditDeleteCard(props.card);
	}

	return (
		<article className="elements__element element">
			<div className="element__container-image">
				<div className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
					<img src={deleteUrn} alt="Урна" />
				</div>
				<img src={props.card.link} alt={props.card.name} className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} />
			</div>
			<div className="element__content">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__like-info">
					<button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<div className="element__quanity-like">{props.card.likes.length}</div>
				</div>
			</div>
		</article>
	)
}

export default Card;