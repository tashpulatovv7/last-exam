import { useEffect, useState } from 'react';
import { getProfile } from '../API';

const useProfile = () => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProfile = async () => {
		setLoading(true);
		try {
			const data = await getProfile();
			setProfile(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return { profile, loading, error, refetch: fetchProfile };
};

export default useProfile;
