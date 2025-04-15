import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
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

	const { data, isLoading, isError } = useQuery({
		queryKey: ['libraryDetail', id],
		queryFn: () => getLibraryDetail(id!),
		enabled: !!id,
	});

	if (isLoading) return <h1 className='text-center text-3xl'>Yuklanmoqda...</h1>;
	if (isError || !data)
		return <h1 className='text-center text-red-500 text-xl'>Xatolik yuz berdi</h1>;

	const { library, books, phone, is_active, total_books } = data;

	return (
		<div className='library-detail-container'>
			<div className='library-info-card'>
				<h1>{library?.name}</h1>
				<p>📍 {library?.address}</p>
				{phone && <p>📞 {phone}</p>}
				<p className={is_active ? 'status-active' : 'status-inactive'}>
					Status: {is_active ? 'Faol' : 'Faol emas'}
				</p>
				<p className='total-books'>📚 Jami kitoblar: {total_books}</p>
				{library?.google_maps_url && (
					<a
						href={library.google_maps_url}
						target='_blank'
						rel='noopener noreferrer'
					>
						📌 Google Maps
					</a>
				)}
			</div>

			<div className='books-grid'>
				{books?.length > 0 ? (
					books.map((book: Book) => (
						<div key={book.id} className='book-card'>
							<h2>{book.name}</h2>
							<p>✍️ {book.author}</p>
							<p>🏢 {book.publisher}</p>
							<p>Soni: {book.quantity_in_library}</p>
						</div>
					))
				) : (
					<p className='no-books'>Kitoblar mavjud emas</p>
				)}
			</div>
		</div>
	);
};

export default LibraryDetail;
