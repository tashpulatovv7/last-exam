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

		const data = response.data;

		localStorage.setItem('token', JSON.stringify(data.access));

		return data;
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
			await login(data);
			message.success('Login successful!');
			// navigate('/profile');
		} catch (error: any) {
			message.error('Login failed: Incorrect phone or password');
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading };
};
