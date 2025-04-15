import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import './register.css';

interface RegisterData {
	libraryName: string;
	adminName: string;
	password: string;
	phoneNumber: string;
	allowBookRentals: boolean;
	address: string;
	latitude: string;
	longitude: string;
	socialMedia: Array<{
		platform: string;
		url: string;
	}>;
}

const defaultIcon = L.icon({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const MapEvents = ({
	onLocationSelect,
}: {
	onLocationSelect: (lat: number, lng: number) => void;
}) => {
	useMapEvents({
		click: e => {
			onLocationSelect(e.latlng.lat, e.latlng.lng);
		},
	});
	return null;
};

const Register: React.FC = () => {
	const navigate = useNavigate();
	const [position, setPosition] = useState<[number, number]>([41.311081, 69.240562]);
	const [formData, setFormData] = useState<RegisterData>({
		libraryName: '',
		adminName: '',
		password: '',
		phoneNumber: '',
		allowBookRentals: false,
		address: '',
		latitude: '',
		longitude: '',
		socialMedia: [{ platform: 'telegram', url: '' }],
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSocialChange = (index: number, field: 'platform' | 'url', value: string) => {
		setFormData(prev => {
			const updated = [...prev.socialMedia];
			updated[index] = {
				...updated[index],
				[field]: value,
			};
			return {
				...prev,
				socialMedia: updated,
			};
		});
	};

	const addSocialField = () => {
		setFormData(prev => ({
			...prev,
			socialMedia: [...prev.socialMedia, { platform: '', url: '' }],
		}));
	};

	const removeSocialField = (index: number) => {
		setFormData(prev => ({
			...prev,
			socialMedia: prev.socialMedia.filter((_, i) => i !== index),
		}));
	};

	const handleLocation = (lat: number, lng: number) => {
		setPosition([lat, lng]);
		setFormData(prev => ({
			...prev,
			latitude: lat.toString(),
			longitude: lng.toString(),
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert('Successfully registered! Awaiting admin approval.');
		setTimeout(() => navigate('/login'), 2000);
	};

	return (
		<div className='register-container'>
			<h1 className='register-title'>Library Registration</h1>
			<p className='register-subtitle'>Fill in the library information</p>

			<form onSubmit={handleSubmit}>
				<div className='section'>
					<h2>Library Info</h2>
					<div className='input-group'>
						<label>Library Name</label>
						<input
							name='libraryName'
							value={formData.libraryName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='grid-row'>
						<div className='input-group'>
							<label>Admin Name</label>
							<input
								name='adminName'
								value={formData.adminName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='input-group'>
							<label>Phone Number</label>
							<input
								name='phoneNumber'
								type='tel'
								value={formData.phoneNumber}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className='input-group'>
						<label>Password</label>
						<input
							name='password'
							type='password'
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='checkbox-group'>
						<input
							type='checkbox'
							name='allowBookRentals'
							checked={formData.allowBookRentals}
							onChange={handleChange}
						/>
						<label>Allow Book Rentals</label>
					</div>
				</div>

				<div className='section'>
					<h2>Location</h2>
					<div className='map-box'>
						<MapContainer
							center={position}
							zoom={13}
							style={{ height: '400px', width: '100%' }}
						>
							<TileLayer
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								attribution='&copy; OpenStreetMap contributors'
							/>
							<Marker position={position} />
							<MapEvents onLocationSelect={handleLocation} />
						</MapContainer>
					</div>
					<div className='location-info'>
						<div className='input-group'>
							<label>Address</label>
							<input
								readOnly
								value={formData.address || 'No location selected'}
								className='readonly'
							/>
						</div>
						<div className='grid-row'>
							<div className='input-group'>
								<label>Latitude</label>
								<input
									readOnly
									value={formData.latitude}
									className='readonly'
								/>
							</div>
							<div className='input-group'>
								<label>Longitude</label>
								<input
									readOnly
									value={formData.longitude}
									className='readonly'
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='section'>
					<div className='section-header'>
						<h2>Social Media</h2>
						<button
							type='button'
							onClick={addSocialField}
							className='add-btn'
						>
							+ Add
						</button>
					</div>
					{formData.socialMedia.map((social, idx) => (
						<div className='social-row' key={idx}>
							<div className='grid-row'>
								<div className='input-group'>
									<label>Platform</label>
									<input
										value={social.platform}
										onChange={e =>
											handleSocialChange(
												idx,
												'platform',
												e.target.value
											)
										}
									/>
								</div>
								<div className='input-group'>
									<label>URL</label>
									<input
										value={social.url}
										onChange={e =>
											handleSocialChange(
												idx,
												'url',
												e.target.value
											)
										}
									/>
								</div>
								{idx > 0 && (
									<button
										type='button'
										onClick={() => removeSocialField(idx)}
										className='remove-btn'
									>
										×
									</button>
								)}
							</div>
						</div>
					))}
				</div>

				<div className='form-footer'>
					<button
						type='button'
						onClick={() => navigate('/login')}
						className='cancel-btn'
					>
						Cancel
					</button>
					<button type='submit' className='submit-btn'>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
