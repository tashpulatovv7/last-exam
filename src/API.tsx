import { message } from 'antd';
import axios, { AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
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
			const cleanToken = token.replace(/^"|"$/g, '');
			config.headers.Authorization = `Bearer ${cleanToken}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

API.interceptors.response.use(
	response => response,
	error => {
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

export type Book = {
	id: number;
	name: string;
	author: string;
	publisher: string;
	quantity_in_library: number;
};

export type LibraryDetailType = {
	library: {
		id: number;
		name: string;
		address: string;
		google_maps_url?: string;
	};
	books: Book[];
	phone: string;
	is_active: boolean;
	total_books: number;
};

export const getLibraryDetail = async (id: string): Promise<LibraryDetailType> => {
	const res = await API.get(`/libraries/library/${id}/`);
	return res.data.results;
};

export const getProfile = async (): Promise<any> => {
	const res = await API.get('/auth/profile/');
	return res.data;
};

export const updateRemoteProfile = async (data: Record<string, any>): Promise<any> => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Token not found');

	const res = await fetch('https://s-libraries.uz/api/v1/auth/profile/', {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token.replace(/^"|"$/g, '')}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const errData = await res.json();
		throw new Error(errData.message || 'Error updating profile');
	}

	return await res.json();
};

export const getLocalProfile = async (): Promise<any> => {
	const res = await axios.get(`https://s-libraries.uz/api/v1/libraries/me/`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	return res.data;
};

export const updateLocalProfile = async (profileData: Record<string, any>): Promise<any> => {
	const res = await axios.put(
		`https://s-libraries.uz/api/v1/libraries/${profileData.id}/`,
		profileData,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return res.data;
};

export const updateLibrary = async (id: string, libraryData: Record<string, any>): Promise<any> => {
	const res = await axios.patch(
		`https://s-libraries.uz/api/v1/libraries/library/${id}/`,
		libraryData,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return res.data;
};

export const deleteBookFromLibrary = async (id: string, bookId: string): Promise<any> => {
	const res = await axios.delete(
		`https://s-libraries.uz/api/v1/libraries/${id}/books/${bookId}/`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return res.data;
};

export const login = async (phone: string, password: string): Promise<any> => {
	const res = await API.post(`/auth/login/`, {
		phone,
		password,
	});
	return res.data;
};

export const addBookToLibrary = async (id: string, bookData: Record<string, any>): Promise<any> => {
	const res = await axios.post(
		`https://s-libraries.uz/api/v1/libraries/${id}/books/`,
		bookData,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	);
	return res.data;
};
