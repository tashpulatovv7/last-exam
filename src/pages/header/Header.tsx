import { useEffect, useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
	const location = useLocation();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
					</div>
				</div>

				<div className='header-auth'>
					<Link to='/login'>
						<button className='header-login'>Login</button>
					</Link>

					<Link to='/register'>
						<button className='header-register'>Register</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
