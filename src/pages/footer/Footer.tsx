import './footer.css';

const Footer = () => {
	return (
		<footer>
			<div className='container'>
				<div className='footer'>
					<div className='footer-section'>
						<h3>Ezma</h3>
						<p>Find books in libraries across Uzbekistan with ease.</p>
					</div>
					<div className='footer-section'>
						<h3>Quick Links</h3>
						<ul>
							<li>
								<a href='/home'>Home</a>
							</li>
							<li>
								<a href='/about'>About</a>
							</li>
							<li>
								<a href='/library-list'>Library List</a>
							</li>
						</ul>
					</div>
					<div className='footer-section'>
						<h3>Contact</h3>
						<p>Email: info@ezma.uz</p>
						<p>Phone: +998 XXX XXX XX XX</p>
					</div>
				</div>

				<div className='footer-divider'></div>

				<div className='footer-bottom'>
					<p>© 2025 Ezma. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
