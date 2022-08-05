import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip(props) {
	return (
		<PopupWithForm
			name='tooltip'
			title={props.isSuccessfully ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}
			isSuccessfully={props.isSuccessfully}
			isOpen={props.isOpen}
			onClose={props.onClose}
		/>
	)
}

export default InfoTooltip;