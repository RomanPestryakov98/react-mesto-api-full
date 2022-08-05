import PopupWithForm from './PopupWithForm';
import React, { useState } from 'react';
import * as auth from '../auth.js';
import { useHistory } from 'react-router-dom';

function Register(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	function handleEmailChange(e) {
		setEmail(e.target.value)
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault();
		auth.register(password, email)
			.then(res => {
				if (res) {
					history.push('/sign-in')
					props.onSuccessfully(true);
					props.onRegistration();
				}
			})
			.catch(() => {
				props.onSuccessfully(false);
				props.onRegistration();
			})
	}

	return (
		<PopupWithForm name='auth' title='Регистрация' isAuth={true} buttonText='Зарегистрироваться' isValid={[true]} onSubmit={handleSubmit}>
			<label className="popup__label">
				<input type="email" placeholder="Email" className="popup__input popup__input_type_auth" required onChange={handleEmailChange} />
			</label>
			<label className="popup__label">
				<input type="password" placeholder="Пароль" className="popup__input popup__input_type_auth" required onChange={handlePasswordChange} />
			</label>
		</PopupWithForm>
	)
}

export default Register;