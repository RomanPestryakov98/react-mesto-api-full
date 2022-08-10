class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка тут: ${res.status}`);
	}

	getDataProfile(token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		})
			.then(this._checkResponse);
	}

	getDataCards(token) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		})
			.then(this._checkResponse);
	}

	updateDataProfile(data, token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
			.then(this._checkResponse);
	}

	addNewCard(data, token) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		})
			.then(this._checkResponse);
	}

	deleteCard(id, token) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		})
			.then(this._checkResponse);
	}

	toggleLike(id, isLiked, token) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: isLiked ? 'DELETE' : 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		})
			.then(this._checkResponse);
	}

	updateAvatar(data, token) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				avatar: data.avatar
			})
		})
			.then(this._checkResponse);
	}

}


const api = new Api({
	baseUrl: 'https://api.mesto.nomoredomains.sbs'
})

export default api;