import { FaBook, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import './home.css';

const Home = () => {
	interface Book {
		title: string;
		author: string;
	}

	const books: Book[] = [
		{ title: 'The Alchemist', author: 'Paulo Coelho' },
		{ title: 'To Kill a Mockingbird', author: 'Harper Lee' },
		{ title: '1984', author: 'George Orwell' },
	];

	return (
		<div className='container'>
			<div className='home'>
				<section className='home-section'>
					<h1>Find Books in Libraries Across Uzbekistan</h1>
					<p>
						Search for any book and discover which libraries have it
						available near you.
					</p>
					<div className='search-bar'>
						<FaSearch className='search-icon' />
						<input
							type='text'
							placeholder='Search by book title or author...'
						/>
						<button>Search</button>
					</div>
				</section>

				<section className='features-section'>
					<h2>Why Ezma?</h2>
					<div className='features'>
						<div className='feature'>
							<div className='icon-bg'>
								<FaBook />
							</div>
							<h3>Find Any Book</h3>
							<p>
								Search through thousands of books available in
								libraries across Uzbekistan.
							</p>
						</div>
						<div className='feature'>
							<div className='icon-bg'>
								<FaMapMarkerAlt />
							</div>
							<h3>Locate Nearby Libraries</h3>
							<p>
								Discover which libraries near you have the books
								you're looking for.
							</p>
						</div>
						<div className='feature'>
							<div className='icon-bg'>
								<FaClock />
							</div>
							<h3>Save Time</h3>
							<p>
								No more visiting multiple libraries to find the book
								you need.
							</p>
						</div>
					</div>
				</section>

				<div className='books-container'>
					<h2>Most Searched Books</h2>
					<div className='books-grid'>
						{books.map((book, index) => (
							<div className='book-card' key={index}>
								<div className='book-image'>
									<img
										src='https://v0-ezma-project-details.vercel.app/placeholder.svg?height=400&width=300'
										alt={book.title}
									/>
								</div>
								<h3>{book.title}</h3>
								<p>{book.author}</p>
							</div>
						))}
					</div>
					<button className='explore-button'>Explore All Libraries</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
