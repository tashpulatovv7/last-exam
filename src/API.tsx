import { message } from 'antd';
import axios from 'axios';

const API = axios.create({
	baseURL: 'https://s-libraries.uz/api/v1',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

API.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');

		if (
			token &&
			config.url &&
			!config.url.includes('/auth/login/') &&
			!config.url.includes('/auth/register/')
		) {
			// ✅ Tokenni tozalab yuborish (agar "..." formatda bo‘lsa)
			const cleanToken = token.replace(/^"|"$/g, '');
			config.headers['Authorization'] = `Bearer ${cleanToken}`;
		}

		return config;
	},
	error => {
		console.error('Request error:', error);
		return Promise.reject(error);
	}
);

API.interceptors.response.use(
	response => response,
	error => {
		console.error('Response error:', error);
		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			message.error('Session has expired. Please log in again.');
			setTimeout(() => {
				window.location.replace('/login');
			}, 500);
		}
		return Promise.reject(error);
	}
);

export default API;

export const getProfile = async () => {
	try {
		const res = await API.get('/auth/profile/');
		return res.data;
	} catch (error) {
		console.error('Error fetching profile:', error);
		throw new Error('Failed to fetch profile data.');
	}
};

export const updateProfile = async (data: any) => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Token not found');

	try {
		const res = await fetch('https://s-libraries.uz/api/v1/auth/profile/', {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token.replace(/^"|"$/g, '')}`, // ✅ tozalab yuboriladi
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const errData = await res.json();
			throw new Error(errData.message || 'Error updating profile');
		}

		return await res.json();
	} catch (error) {
		console.error('Error updating profile:', error);
		throw error;
	}
};
