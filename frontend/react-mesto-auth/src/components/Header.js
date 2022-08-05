import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../images/header/logo.svg';
import { useHistory } from 'react-router-dom';

function Header(props) {
	const history = useHistory();
	function onSignOut() {
		localStorage.removeItem('token');
		history.push('/sign-in');
		document.documentElement.classList.remove('menu-open')
	}

	function clickBurger(e) {
		document.documentElement.classList.toggle('menu-open')
	}

	return (
		<header className="header">
			<img src={logo} alt="Лого" className="header__logo" />
			{window.location.pathname === '/sign-in' && <Link className='header__inner' to="/sign-up">Регистрация</Link>}
			{window.location.pathname === '/sign-up' && <Link className='header__inner' to="/sign-in">Войти</Link>}
			{window.location.pathname === '/' &&
				<div className='header__info-profile'>
					<address className='header__address'>{props.email}</address>
					<Link className='header__inner header__inner_type_exit' to="/sign-in" onClick={onSignOut}>Выйти</Link>
				</div>
			}
			{window.location.pathname === '/' && <button type="button" className="header__burger" onClick={clickBurger}><span></span></button>}
		</header>
	)
}

export default Header;