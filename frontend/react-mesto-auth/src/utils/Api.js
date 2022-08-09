class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getDataProfile() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers
		})
			.then(this._checkResponse);
	}

	getDataCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: this._headers
		})
			.then(this._checkResponse);
	}

	updateDataProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
			.then(this._checkResponse);
	}

	addNewCard(data) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		})
			.then(this._checkResponse);
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(this._checkResponse);
	}

	toggleLike(id, isLiked) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: isLiked ? 'DELETE' : 'PUT',
			headers: this._headers,
		})
			.then(this._checkResponse);
	}

	updateAvatar(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.avatar
			})
		})
			.then(this._checkResponse);
	}

}


const api = new Api({
	baseUrl: 'https://api.mesto.nomoredomains.sbs',
	headers: {
		authorization: '42addcd3-4dcf-4727-a945-f301b68d55fb',
		'Content-Type': 'application/json'
	}
})

export default api;