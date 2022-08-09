import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	const [title, setTitle] = useState('');
	const [link, setLink] = useState('');
	const [isTitleValid, setIsTitleValid] = useState(false);
	const [isLinkValid, setIsLinkValid] = useState(false);
	const [spanTitle, setSpanTitle] = useState('');
	const [spanLink, setSpanLink] = useState('');

	useEffect(() => {
		setTitle('');
		setLink('');
		setIsTitleValid(false);
		setIsLinkValid(false);
	}, [props.isOpen]);

	function handleTitleChange(e) {
		setTitle(e.target.value)
		if (!e.target.validity.valid) {
			setIsTitleValid(false)
			setSpanTitle(e.target.validationMessage);
		}
		else {
			setIsTitleValid(true)
			setSpanTitle('');
		}
	}

	function handleLinkChange(e) {
		setLink(e.target.value)
		if (!e.target.validity.valid) {
			setIsLinkValid(false)
			setSpanLink(e.target.validationMessage);
		}
		else {
			setIsLinkValid(true)
			setSpanLink('');
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onAddCard({ name: title, link: link });
	}

	return (
		<PopupWithForm name='add-card' title='Новое место' isOpen={props.isOpen} isValid={[isTitleValid, isLinkValid]} onClose={props.onClose} buttonText='Создать' onSubmit={handleSubmit} isLoading={props.isLoading} renderLoadingText='Создание...'>
			<label className="popup__label">
				<input type="text" placeholder="Название" className="popup__input popup__input_type_title" id="input-title"
					required minLength="2" maxLength="30" name="name" onChange={handleTitleChange} value={title} />
				<span className={`popup__error input-url-avatar-error ${!isTitleValid && 'popup__error_visible'}`}>{spanTitle}</span>
			</label>
			<label className="popup__label">
				<input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" id="input-url"
					required name="link" onChange={handleLinkChange} value={link} />
				<span className={`popup__error input-url-avatar-error ${!isLinkValid && 'popup__error_visible'}`}>{spanLink}</span>
			</label>
		</PopupWithForm>
	)
}

export default AddPlacePopup;