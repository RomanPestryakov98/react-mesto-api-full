import React, { useState } from 'react';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleEmailChange(e) {
		setEmail(e.target.value)
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onAuthorization(password, email);
	}

	return (
		<div className='authorization'>
			<h3 className='popup__title popup__title_type_auth'>Вход</h3>
			<form action="#" name='register' className="popup__form popup__form_type_authorization" noValidate onSubmit={handleSubmit} >
				<label className="popup__label">
					<input type="email" placeholder="Email" className="popup__input popup__input_type_auth" required onChange={handleEmailChange} value={email} />
				</label>
				<label className="popup__label">
					<input type="password" placeholder="Пароль" className="popup__input popup__input_type_auth" required onChange={handlePasswordChange} value={password} />
				</label>

				<div className='submit-container'>
					<button type="submit" className="popup__submit popup__submit_type_auth">Войти</button>
				</div>
			</form>
		</div>
	)
}

export default Login;