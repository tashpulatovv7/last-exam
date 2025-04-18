import { useState } from 'react';
import { FiAlertCircle, FiBook, FiMapPin, FiSearch } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { useLibraries } from '../../hooks/useLibraries';
import './libraryList.css';

const LibraryList = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const { libraries, loading, error } = useLibraries();

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 8;

	const filteredLibraries = libraries.filter(
		library =>
			library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			library.address.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handlePageChange = (selectedPage: { selected: number }) => {
		setCurrentPage(selectedPage.selected);
	};

	const displayedLibraries = filteredLibraries.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);

	return (
		<div className='library-list-container'>
			<div className='library-list-header'>
				<h1>Libraries</h1>
				<div className='search-box'>
					<FiSearch className='search-icon-k' />
					<input
						type='text'
						placeholder='Search...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{loading ? (
				<div className='loader'>Loading...</div>
			) : error ? (
				<div className='error-message'>
					<FiAlertCircle /> {error}
				</div>
			) : (
				<>
					<div className='libraries-grid'>
						{displayedLibraries.map(library => (
							<div key={library.id} className='library-card'>
								<Link to={`/library/${library.id}`}>
									<div className='library-image'>
										<img
											src='https://v0-ezma-project-details.vercel.app/placeholder.svg?height=400&width=300'
											alt={library.name}
										/>
									</div>
									<div className='library-info'>
										<h2>{library.name}</h2>
										<p>
											<FiMapPin /> {library.address}
										</p>
										<p>
											<FiBook /> {library.total_books}{' '}
											books
										</p>
									</div>
								</Link>
							</div>
						))}
					</div>

					<div className='pagination-container'>
						<ReactPaginate
							previousLabel={'Previous'}
							nextLabel={'Next'}
							pageCount={Math.ceil(
								filteredLibraries.length / itemsPerPage
							)}
							onPageChange={handlePageChange}
							containerClassName={'pagination'}
							pageClassName={'page-item'}
							pageLinkClassName={'page-link'}
							previousClassName={'page-item'}
							previousLinkClassName={'page-link'}
							nextClassName={'page-item'}
							nextLinkClassName={'page-link'}
							activeClassName={'active'}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default LibraryList;
