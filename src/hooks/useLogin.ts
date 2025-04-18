import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../API';

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

export const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleLogin = async (phone: string, password: string) => {
		setLoading(true);
		setError(null);
		try {
			const response: LoginResponse = await login(phone, password);
			localStorage.setItem('token', response.access);
			localStorage.setItem('isLoggedIn', 'true');
			navigate('/');
		} catch (err) {
			console.error('Login failed:', err);
			setError('Login failed. Please check your credentials.');
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, handleLogin };
};
