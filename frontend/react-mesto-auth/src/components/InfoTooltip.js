import React from 'react';
import cross from '../images/popup/non-ok-cross.svg';
import check from '../images/popup/ok-check.svg';
import close from '../images/popup/close.svg';

function InfoTooltip(props) {
	return (
		<div className={`popup popup_type_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__overlay"></div>
			<div className='popup__container popup__container_type_tooltip'>
				<button className="popup__close" onClick={props.onClose}>
					<img src={close} alt="Закрыть" className="popup__close-cross" />
				</button>
				<img src={props.isSuccessfully ? check : cross} alt={props.isSuccessfully ? 'Успешно' : 'Ошибка'} className='popup__image-tooltip' />
				<h2 className='popup__title popup__title_type_tooltip'>{props.isSuccessfully
					? "Вы успешно зарегистрировались!"
					: "Что-то пошло не так!Попробуйте ещё раз."}
				</h2>
			</div>
		</div>
	)
}

export default InfoTooltip;