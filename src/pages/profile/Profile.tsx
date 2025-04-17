import { Button, Form, Input, message, Modal, Spin, Switch } from 'antd';
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
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onFinish = async (values: any) => {
		try {
			const updatedData = { ...profile, ...values };
			await updateProfile(updatedData);
			message.success('Profile updated successfully');
			setIsModalOpen(false);
			refetch();
		} catch (err: any) {
			message.error(err.message);
		}
	};

	if (loading) return <Spin size='large' tip='Loading profile...' className='spin' />;
	if (error || !profile) return <div className='error'>{error || 'No profile data found'}</div>;

	return (
		<div className='library-profile-page'>
			<div className='profile-header-ss'>
				<h1>Library Profile</h1>
				<Button type='primary' onClick={() => setIsModalOpen(true)}>
					<FaUserEdit className='edit-icon' />
					Edit
				</Button>
			</div>

			<div className='profile-content'>
				<div className='info-side'>
					<p>
						<FaIdCard /> <strong>ID:</strong> {profile.id}
					</p>
					<p>
						<FaMapMarkerAlt /> <strong>Address:</strong> {profile.address}
					</p>
					<p>
						<FaBookOpen /> <strong>Book Rental:</strong>{' '}
						{profile.can_rent_books ? 'Available' : 'Unavailable'}
					</p>
					<p>
						<FaUserCircle /> <strong>User ID:</strong> {profile.user}
					</p>

					{profile.social_media?.telegram && (
						<p>
							<FaTelegram /> <strong>Telegram:</strong>{' '}
							<a
								href={`https://${profile.social_media.telegram}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								{profile.social_media.telegram}
							</a>
						</p>
					)}

					{profile.image && (
						<div className='profile-img'>
							<img src={profile.image} alt='Library' />
						</div>
					)}
				</div>

				<div className='map-side'>
					{profile.address && profile.address.length > 5 ? (
						<iframe
							width='100%'
							height='350'
							style={{ border: 0, borderRadius: '10px' }}
							loading='lazy'
							allowFullScreen
							src={`https://maps.google.com/maps?q=${encodeURIComponent(
								profile.address
							)}&z=15&output=embed`}
						></iframe>
					) : (
						<div className='no-map'>Address not found</div>
					)}
				</div>
			</div>

			<Modal
				title='Edit Profile'
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
			>
				<Form layout='vertical' initialValues={profile} onFinish={onFinish}>
					<Form.Item name='address' label='Address'>
						<Input />
					</Form.Item>

					<Form.Item
						name='can_rent_books'
						label='Book Rental'
						valuePropName='checked'
					>
						<Switch />
					</Form.Item>

					<Form.Item name={['social_media', 'telegram']} label='Telegram Link'>
						<Input />
					</Form.Item>

					<Form.Item name='latitude' label='Latitude'>
						<Input />
					</Form.Item>

					<Form.Item name='longitude' label='Longitude'>
						<Input />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Save
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Profile;
