import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	const [title, setTitle] = useState('');
	const [link, setLink] = useState('');
	const [isTitleValid, setIsTitleValid] = useState(false);
	const [isLinkValid, setIsLinkValid] = useState(false);
	const inputTitleRef = useRef();
	const inputLinkRef = useRef();
	const spanTitleRef = useRef();
	const spanLinkRef = useRef();

	useEffect(() => {
		setIsTitleValid(false);
		setIsLinkValid(false);
	}, [props.isOpen]);

	function handleTitleChange(e) {
		setTitle(e.target.value)
		if (!e.target.validity.valid) {
			setIsTitleValid(false)
			spanTitleRef.current.textContent = inputTitleRef.current.validationMessage;
		}
		else {
			setIsTitleValid(true)
			spanTitleRef.current.textContent = '';
		}
	}

	function handleLinkChange(e) {
		setLink(e.target.value)
		if (!e.target.validity.valid) {
			setIsLinkValid(false)
			spanLinkRef.current.textContent = inputLinkRef.current.validationMessage;
		}
		else {
			setIsLinkValid(true)
			spanLinkRef.current.textContent = '';
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onAddCard({ name: title, link: link });
		e.target.reset();
	}

	return (
		<PopupWithForm name='add-card' title='Новое место' isOpen={props.isOpen} isValid={[isTitleValid, isLinkValid]} onClose={props.onClose} buttonText='Создать' onSubmit={handleSubmit} isLoading={props.isLoading} renderLoadingText='Создание...'>
			<label className="popup__label">
				<input type="text" placeholder="Название" className="popup__input popup__input_type_title" id="input-title"
					required minLength="2" maxLength="30" name="name" onChange={handleTitleChange} ref={inputTitleRef} value={title} />
				<span className={`popup__error input-url-avatar-error ${!isTitleValid && 'popup__error_visible'}`} ref={spanTitleRef}></span>
			</label>
			<label className="popup__label">
				<input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" id="input-url"
					required name="link" onChange={handleLinkChange} ref={inputLinkRef} value={link} />
				<span className={`popup__error input-url-avatar-error ${!isLinkValid && 'popup__error_visible'}`} ref={spanLinkRef}></span>
			</label>
		</PopupWithForm>
	)
}

export default AddPlacePopup;