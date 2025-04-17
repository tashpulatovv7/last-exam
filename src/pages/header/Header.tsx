import { useEffect, useState } from 'react';
import { FaBookOpen, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './header.css';

const Header = () => {
	const location = useLocation();
	const [isScrolled, setIsScrolled] = useState(false);
	const navigate = useNavigate();
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('token');
		navigate('/login');
	};

	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

	return (
		<header className={isScrolled ? 'header scrolled' : 'header'}>
			<div className='container'>
				<div className='header-left'>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<div className='logo'>
							<div className='book-icon-badge'>
								<FaBookOpen />
							</div>
							<span className='logo-text'>EZMA</span>
						</div>
					</Link>

					<div className='header-pages'>
						<Link
							to='/'
							className={location.pathname === '/' ? 'active-page' : ''}
						>
							Home
						</Link>
						<Link
							to='/about'
							className={
								location.pathname === '/about' ? 'active-page' : ''
							}
						>
							About
						</Link>
						<Link
							to='/libraryList'
							className={
								location.pathname === '/libraryList'
									? 'active-page'
									: ''
							}
						>
							Library List
						</Link>

						{isLoggedIn && (
							<Link
								to='/profile'
								className={
									location.pathname === '/profile'
										? 'active-page'
										: ''
								}
							>
								Profile
							</Link>
						)}
					</div>
				</div>

				<div className='header-right'>
					<button className='theme-toggle' onClick={toggleTheme}>
						{theme === 'light' ? <FaMoon /> : <FaSun />}
					</button>
					<div className='header-auth'>
						{!isLoggedIn ? (
							<>
								<Link to='/login'>
									<button className='header-login'>
										Login
									</button>
								</Link>

								<Link to='/register'>
									<button className='header-register'>
										Register
									</button>
								</Link>
							</>
						) : (
							<button className='header-login' onClick={handleLogout}>
								Logout
							</button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
