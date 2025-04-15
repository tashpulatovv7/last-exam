import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './login.css';

const Login = () => {
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const { handleLogin, loading } = useLogin();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin({ phone, password });
	};

	return (
		<div className='login-container'>
			<div className='login-card'>
				<h2>Login</h2>
				<p className='subtitle'>Enter your credentials to access your account</p>

				<form onSubmit={onSubmit}>
					<label>Phone</label>
					<input
						type='text'
						placeholder='+998901234567'
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>

					<label>Password</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<div className='forgot-password'>
						<a href='#'>Forgot password?</a>
					</div>

					<button type='submit' className='login-btn' disabled={loading}>
						{loading ? 'Loading...' : 'Login'}
					</button>
				</form>

				<p className='register-text'>
					Don't have an account?{' '}
					<Link to='/register'>Register as a librarian</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
