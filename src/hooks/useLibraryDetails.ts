import { useEffect, useState } from 'react';
import { getLibraryDetail } from '../API';

const useLibraryDetail = (id: string) => {
	const [detail, setDetail] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (id) {
			setLoading(true);
			setError(null);
			getLibraryDetail(id)
				.then(res => {
					setDetail(res);
				})
				.catch(err => {
					console.error('Xatolik:', err);
					setError("Ma'lumotlarni olishda xatolik yuz berdi.");
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [id]);

	return { detail, error, loading };
};

export default useLibraryDetail;
