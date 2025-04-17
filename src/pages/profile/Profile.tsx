import { useState } from 'react';
import {
	FaBookOpen,
	FaIdCard,
	FaMapMarkerAlt,
	FaTelegram,
	FaUserCircle,
	FaUserEdit,
} from 'react-icons/fa';
import { updateProfile } from '../../API';
import useProfile from '../../hooks/useProfile';
import './profile.css';

const Profile = () => {
	const { profile, loading, error, refetch } = useProfile();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<any>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		if (name.includes('.')) {
			const [parentKey, childKey] = name.split('.');
			setFormData((prev: any) => ({
				...prev,
				[parentKey]: {
					...prev[parentKey],
					[childKey]: type === 'checkbox' ? checked : value,
				},
			}));
		} else {
			setFormData((prev: any) => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const updated = {
				...profile,
				...formData,
				social_media: {
					...profile.social_media,
					...(formData.social_media || {}),
				},
			};
			await updateProfile(updated);
			refetch();
			setIsEditing(false);
			alert('Profile updated successfully!');
		} catch (err) {
			alert('Failed to update profile');
		}
	};

	if (loading) return <div className='profile-loading'>Loading profile...</div>;
	if (error || !profile)
		return <div className='profile-error'>Error: {error || 'No data found'}</div>;

	const userName = profile?.user ? profile.user.name : 'N/A';
	const userPhone = profile?.user ? profile.user.phone : 'N/A';

	return (
		<div className='profile-container'>
			<div className='profile-header'>
				<h1>Library Profile</h1>
				<button className='edit-button' onClick={() => setIsEditing(true)}>
					<FaUserEdit /> Edit
				</button>
			</div>

			<div className='profile-content'>
				<div className='profile-info'>
					<p>
						<FaIdCard /> <strong>ID:</strong> {profile?.id || 'N/A'}
					</p>
					<p>
						<FaMapMarkerAlt /> <strong>Address:</strong>{' '}
						{profile?.address || 'N/A'}
					</p>
					<p>
						<FaBookOpen /> <strong>Book Rental:</strong>{' '}
						{profile?.can_rent_books ? 'Available' : 'Unavailable'}
					</p>
					<p>
						<FaUserCircle /> <strong>User Name:</strong> {userName}
					</p>
					<p>
						<FaUserCircle /> <strong>User Phone:</strong> {userPhone}
					</p>

					{profile?.social_media?.telegram && (
						<p>
							<FaTelegram /> <strong>Telegram:</strong>{' '}
							<a
								href={`https://${profile.social_media.telegram}`}
								target='_blank'
								rel='noreferrer'
							>
								{profile.social_media.telegram}
							</a>
						</p>
					)}

					{profile?.image && (
						<div className='profile-image'>
							<img src={profile.image} alt='Library' />
						</div>
					)}
				</div>

				<div className='profile-map'>
					{profile?.address ? (
						<iframe
							src={`https://maps.google.com/maps?q=${encodeURIComponent(
								profile.address
							)}&z=15&output=embed`}
							loading='lazy'
							allowFullScreen
						></iframe>
					) : (
						<p>No address found</p>
					)}
				</div>
			</div>

			{isEditing && (
				<div className='edit-form'>
					<h3>Edit Profile</h3>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='address'
							placeholder='Address'
							defaultValue={profile.address}
							onChange={handleChange}
						/>

						<input
							type='text'
							name='social_media.telegram'
							placeholder='Telegram'
							defaultValue={profile.social_media?.telegram || ''}
							onChange={handleChange}
						/>

						<label>
							<input
								type='checkbox'
								name='can_rent_books'
								defaultChecked={profile.can_rent_books}
								onChange={handleChange}
							/>
							Can Rent Books
						</label>

						<input
							type='text'
							name='latitude'
							placeholder='Latitude'
							defaultValue={profile.latitude}
							onChange={handleChange}
						/>

						<input
							type='text'
							name='longitude'
							placeholder='Longitude'
							defaultValue={profile.longitude}
							onChange={handleChange}
						/>

						<div className='form-buttons'>
							<button type='submit'>Save</button>
							<button type='button' onClick={() => setIsEditing(false)}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Profile;
