import close from '../images/popup/close.svg';

function PopupWithForm(props) {
	const isValidButton = props.isValid && !props.isValid.includes(false);
	const classButton = `popup__submit ${isValidButton ? '' : 'popup__submit_disabled'}`;

	return (
		<div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
			<div className="popup__overlay"></div>
			<div className="popup__container">
				<button className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose}>
					<img src={close} alt="Закрыть" className="popup__close-cross" />
				</button>
				<h3 className='popup__title'>{props.title}</h3>
				<form action="#" name={props.name} className="popup__form" noValidate onSubmit={props.onSubmit} >
					{props.children}
					<button type="submit" disabled={isValidButton ? false : true} className={classButton}>{props.isLoading ? props.renderLoadingText : props.buttonText}</button>
				</form>
			</div>
		</div >
	)
}

export default PopupWithForm;