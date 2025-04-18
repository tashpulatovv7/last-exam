import { useQuery } from '@tanstack/react-query';
import {
	FaArrowLeft,
	FaBook,
	FaBuilding,
	FaCheckCircle,
	FaExternalLinkAlt,
	FaMapMarkerAlt,
	FaPhone,
	FaTimesCircle,
	FaUserAlt,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API';
import './libraryDetails.css';

type Book = {
	id: number;
	name: string;
	author: string;
	publisher: string;
	quantity_in_library: number;
};

type LibraryDetailType = {
	library: {
		id: number;
		name: string;
		address: string;
		google_maps_url?: string;
	};
	books: Book[];
	phone: string;
	is_active: boolean;
	total_books: number;
};

const getLibraryDetail = async (id: string): Promise<LibraryDetailType> => {
	const res = await API.get(`/libraries/library/${id}/`);
	return res.data.results;
};

const LibraryDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isError } = useQuery({
		queryKey: ['libraryDetail', id],
		queryFn: () => getLibraryDetail(id!),
		enabled: !!id,
	});

	if (isLoading) return <h1 className='text-center text-3xl'>Loading...</h1>;
	if (isError || !data)
		return <h1 className='text-center text-red-500 text-xl'>An error occurred</h1>;

	const { library, books, phone, is_active, total_books } = data;

	return (
		<div className='library-detail-container'>
			<button className='back-button' onClick={() => navigate(-1)}>
				<FaArrowLeft /> Back
			</button>
			<div className='library-card'>
				<div className='library-image-section'>
					<img
						src='https://v0-ezma-project-details.vercel.app/placeholder.svg?height=400&width=300'
						alt='Library placeholder'
					/>
				</div>
				<div className='library-info-section'>
					<h1>{library.name}</h1>
					<p>
						<FaMapMarkerAlt /> {library.address}
					</p>
					{phone && (
						<p>
							<FaPhone /> {phone}
						</p>
					)}
					<p className={is_active ? 'status-active' : 'status-inactive'}>
						{is_active ? <FaCheckCircle /> : <FaTimesCircle />}{' '}
						{is_active ? 'Active' : 'Inactive'}
					</p>
					<p className='total-books'>
						<FaBook /> Total Books: {total_books}
					</p>
					{library.google_maps_url && (
						<a
							href={library.google_maps_url}
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaExternalLinkAlt /> Google Maps
						</a>
					)}
				</div>
			</div>

			<h2 className='books-header'>Books</h2>
			<div className='modern-books-grid'>
				{books.length > 0 ? (
					books.map(book => (
						<div key={book.id} className='modern-book-card'>
							<div className='book-icon'>
								<FaBook />
							</div>
							<div className='book-info'>
								<h3>{book.name}</h3>
								<p>
									<FaUserAlt /> {book.author}
								</p>
								<p>
									<FaBuilding /> {book.publisher}
								</p>
								<p>
									<FaBook /> Quantity:{' '}
									{book.quantity_in_library}
								</p>
							</div>
						</div>
					))
				) : (
					<p className='no-books'>No books available</p>
				)}
			</div>
		</div>
	);
};

export default LibraryDetail;
