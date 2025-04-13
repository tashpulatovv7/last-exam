import { useEffect, useState } from 'react';
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
				<h2 className='logo'>EZMA</h2>

				<div className='header-pages'>
					<Link
						to='/'
						className={location.pathname === '/' ? 'active-page' : ''}
					>
						Home
					</Link>
					<Link
						to='/about'
						className={location.pathname === '/about' ? 'active-page' : ''}
					>
						About
					</Link>
					<Link
						to='/libraryList'
						className={
							location.pathname === '/libraryList' ? 'active-page' : ''
						}
					>
						Library List
					</Link>
				</div>

				<div className='header-auth'>
					<button className='header-login'>Login</button>
					<button className='header-register'>Register</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
