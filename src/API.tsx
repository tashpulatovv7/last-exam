import { message } from 'antd';
import axios, { AxiosInstance } from 'axios';
import { LoginData, LoginResponse } from './hooks/useLogin';

const API: AxiosInstance = axios.create({
	baseURL: 'https://s-libraries.uz/api/v1',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

const BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api.com';

export const login = async ({ phone, password }: LoginData): Promise<LoginResponse> => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/login/`, { phone, password });

		if (response.status !== 200 && response.status !== 201) {
			throw new Error('Login muvaffaqiyatsiz tugadi!');
		}

		return response.data;
	} catch (error: any) {
		console.error('Login xatosi:', error);
		throw error;
	}
};

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
	try {
		const res = await API.get('/auth/profile/');
		return res.data;
	} catch (error) {
		console.error('Error fetching profile:', error);
		throw new Error('Failed to fetch profile data.');
	}
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

const LOCAL_API_URL = 'https://s-libraries.uz/api/v1';

// export const login = async (phone: string, password: string): Promise<any> => {
// 	try {
// 		const res = await API.post(`https://s-libraries.uz/api/v1/auth/login`, {
// 			phone: phone,
// 			password: password,
// 		});
// 		return res.data;
// 	} catch (error: any) {
// 		console.error('Login error:', error.message);
// 		throw error;
// 	}
// };

export const getLocalProfile = async (): Promise<any> => {
	try {
		const res = await axios.get(`${LOCAL_API_URL}/libraries/me/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return res.data;
	} catch (error) {
		console.error('Error fetching local profile:', error);
		throw error;
	}
};

export const updateLocalProfile = async (profileData: Record<string, any>): Promise<any> => {
	try {
		const res = await axios.put(
			`${LOCAL_API_URL}/libraries/${profileData.id}/`,
			profileData,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
		return res.data;
	} catch (error) {
		console.error('Error updating local profile:', error);
		throw new Error('Error updating local profile');
	}
};

export const updateLibrary = async (id: string, libraryData: Record<string, any>): Promise<any> => {
	try {
		const res = await axios.patch(
			`${LOCAL_API_URL}/libraries/library/${id}/`,
			libraryData,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
		return res.data;
	} catch (error) {
		console.error('Error updating library:', error);
		throw new Error('Error updating library');
	}
};

export const deleteBookFromLibrary = async (id: string, bookId: string): Promise<any> => {
	try {
		const res = await axios.delete(`${LOCAL_API_URL}/libraries/${id}/books/${bookId}/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return res.data;
	} catch (error) {
		console.error('Error deleting book from library:', error);
		throw new Error('Error deleting book from library');
	}
};

export const addBookToLibrary = async (id: string, bookData: Record<string, any>): Promise<any> => {
	try {
		const res = await axios.post(`${LOCAL_API_URL}/libraries/${id}/books/`, bookData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return res.data;
	} catch (error) {
		console.error('Error adding book to library:', error);
		throw new Error('Error adding book to library');
	}
};

export default API;
