import PopupWithForm from './PopupWithForm';
import React, { useState } from 'react';
import * as auth from '../auth.js';
import { useHistory } from 'react-router-dom';

function Login(props) {
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
		auth.authorize(password, email)
			.then(data => {
				localStorage.setItem('token', data.token);
				props.onLoggedIn();
				history.push('/')
			})
			.catch(() => {
				props.onSuccessfully(false);
				props.onRegistration();
			})
	}

	return (
		<PopupWithForm name='auth' title='Вход' isAuth={true} buttonText='Войти' isValid={[true]} onSubmit={handleSubmit}>
			<label className="popup__label">
				<input type="email" placeholder="Email" className="popup__input popup__input_type_auth" required name="link" onChange={handleEmailChange} />
			</label>
			<label className="popup__label">
				<input type="password" placeholder="Пароль" className="popup__input popup__input_type_auth" required name="link" onChange={handlePasswordChange} />
			</label>
		</PopupWithForm>
	)
}

export default Login;