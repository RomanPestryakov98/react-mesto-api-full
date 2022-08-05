export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
			else {
				throw Error
			}
		})
		.then(res => res)
};


export const authorize = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			else {
				throw Error
			}
		})
};


export const validation = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	})
		.then((response => response.json()))
}; 