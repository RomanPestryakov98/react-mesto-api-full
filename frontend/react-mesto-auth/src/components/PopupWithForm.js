import close from '../images/popup/close.svg';
import cross from '../images/popup/non-ok-cross.svg';
import check from '../images/popup/ok-check.svg';
import { Link } from 'react-router-dom';

function PopupWithForm(props) {
	const isValidButton = props.isValid && !props.isValid.includes(false);
	const classButton = `popup__submit ${isValidButton ? '' : 'popup__submit_disabled'}`;
	return (
		<div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
			{!props.isAuth && <div className="popup__overlay"></div>}
			<div className={!props.isAuth ? "popup__container" : "popup__container-message-info"}>
				{!props.isAuth &&
					<button className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose}>
						<img src={close} alt="Закрыть" className="popup__close-cross" />
					</button>
				}
				{props.name === 'tooltip'}
				{props.name === 'tooltip' &&
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
						{props.isSuccessfully ? <img src={check} alt="Галочка" /> : <img src={cross} alt="Крестик" />}
					</div>
				}
				{props.name !== 'tooltip' ? <h3 className={!props.isAuth ? 'popup__title' : 'popup__title popup__title_type_auth'}>{props.title}</h3> : <h3 className='popup__title' style={{ textAlign: 'center', marginBottom: 0 }}>{props.title}</h3>}
				{props.name !== 'tooltip' &&
					<form action="#" name={props.name} className="popup__form" noValidate onSubmit={props.onSubmit} >
						{props.children}
						<button type="submit" disabled={isValidButton ? false : true} className={classButton + `${props.isAuth && 'popup__submit_type_auth'}`}>{props.isLoading ? props.renderLoadingText : props.buttonText}</button>
						{props.title === 'Регистрация' && <Link className='popup__link' to="/sign-in">Уже зарегистрированы? Войти</Link>}
					</form>
				}
			</div>
		</div >
	)
}

export default PopupWithForm;