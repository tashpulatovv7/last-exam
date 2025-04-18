import { useEffect, useState } from 'react';
import API from '../API';

interface Library {
	id: number;
	name: string;
	image: string | null;
	address: string;
	total_books: number;
	is_active: boolean;
}

export const useLibraries = () => {
	const [libraries, setLibraries] = useState<Library[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
/*************  ✨ Windsurf Command ⭐  *************/
	/**
	 * Fetches the list of libraries from the API.
	 *
	 * @throws {Error} If the API call fails.
	 */
/*******  05a9b421-85e6-4bfe-971c-c006157e2094  *******/
		const fetchLibraries = async () => {
			try {
				setLoading(true);
				const response = await API.get('/libraries/libraries/');
				setLibraries(response.data);
			} catch (err) {
				setError('Kutubxonalarni yuklashda xatolik yuz berdi.');
			} finally {
				setLoading(false);
			}
		};

		fetchLibraries();
	}, []);

	return { libraries, loading, error };
};
