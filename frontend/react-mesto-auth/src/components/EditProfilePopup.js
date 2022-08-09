import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isValidName, setIsValidName] = useState(true);
	const [isValidDescription, setIsValidDescription] = useState(true);
	const [nameSpan, setNameSpan] = useState('');
	const [descriptionSpan, setDescriptionSpan] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, props.isOpen]);


	function handleNameChange(e) {
		setName(e.target.value)
		if (!e.target.validity.valid) {
			setIsValidName(false)
			setNameSpan(e.target.validationMessage);
		}
		else {
			setIsValidName(true)
			setNameSpan('');
		}
	}

	function handleDescriptionChange(e) {
		setDescription(e.target.value)
		if (!e.target.validity.valid) {
			setIsValidDescription(false)
			setDescriptionSpan(e.target.validationMessage);
		}
		else {
			setIsValidDescription(true)
			setDescriptionSpan('')
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateUser({
			name,
			about: description,
		});
	}


	return (
		<PopupWithForm name='profile' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} isValid={[isValidName, isValidDescription]} buttonText='Сохранить' onSubmit={handleSubmit} isLoading={props.isLoading} renderLoadingText='Сохранение...'>
			<label className="popup__label">
				<input type="text" placeholder="Имя" className="popup__input popup__input_type_name" id="input-name" required
					minLength="2" maxLength="40" name="name" onChange={handleNameChange} value={name || ""} />
				<span className={`popup__error input-name-error ${!isValidName && 'popup__error_visible'}`}>{nameSpan}</span>
			</label>
			<label className="popup__label">
				<input type="text" placeholder="О себе" className="popup__input popup__input_type_about" id="input-about" required
					minLength="2" maxLength="200" name="info" onChange={handleDescriptionChange} value={description || ""} />
				<span className={`popup__error input-about-error ${!isValidDescription && 'popup__error_visible'}`}>{descriptionSpan}</span>
			</label>
		</PopupWithForm>
	)
}

export default EditProfilePopup;