import React, { useState } from 'react';
import { FiAlertCircle, FiBook, FiMapPin, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLibraries } from '../../hooks/useLibraries';
import './libraryList.css';

const LibraryList: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const { libraries, loading, error } = useLibraries();

	const filteredLibraries = libraries.filter(
		library =>
			library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			library.address.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className='library-list-container'>
			<div className='library-list-header'>
				<h1>Kutubxonalar</h1>
				<div className='search-box'>
					<FiSearch className='search-icon-k' />
					<input
						type='text'
						placeholder='Qidirish...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{loading ? (
				<div className='loader'>Yuklanmoqda...</div>
			) : error ? (
				<div className='error-message'>
					<FiAlertCircle /> {error}
				</div>
			) : (
				<div className='libraries-grid'>
					{filteredLibraries.map(library => (
						<div key={library.id} className='library-card'>
							<Link to={`/library/${library.id}`}>
								<div className='library-image'>
									<img
										src={
											library.image ||
											'https://i.pinimg.com/736x/c5/98/59/c59859449c63060efc95ccd7c6314a4a.jpg'
										}
										alt={library.name}
									/>
								</div>
								<div className='library-info'>
									<h2>{library.name}</h2>
									<p>
										<FiMapPin /> {library.address}
									</p>
									<p>
										<FiBook /> {library.total_books} ta
										kitob
									</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LibraryList;
