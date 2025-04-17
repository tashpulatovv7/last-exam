import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';

export interface LoginData {
	phone: string;
	password: string;
}

export interface LoginResponse {
	access: string;
	user: {
		id: number;
		name: string;
		phone: string;
		is_active: boolean;
	};
}

const login = async ({ phone, password }: LoginData): Promise<LoginResponse> => {
	try {
		const response = await API.post('/auth/login/', { phone, password });
		console.log('Login response:', response.data);

		const data = response.data;

		if (data.access && data.user) {
			return {
				access: data.access,
				user: data.user,
			};
		}

		if (data.data?.access && data.data?.user) {
			return {
				access: data.data.access,
				user: data.data.user,
			};
		}

		if (data.token && data.user) {
			return {
				access: data.token,
				user: data.user,
			};
		}

		throw new Error('Unexpected login response structure: ' + JSON.stringify(data));
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
};

export const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (data: LoginData) => {
		try {
			setLoading(true);
			const response = await login(data);

			localStorage.setItem('token', response.access);
			localStorage.setItem('user', JSON.stringify(response.user));

			message.success('Login successful!');
			navigate('/profile');
		} catch (error: any) {
			message.error('Login failed: Incorrect phone or password');
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading };
};
