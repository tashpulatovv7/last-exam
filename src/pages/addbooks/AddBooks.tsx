import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import './addbooks.css';

const AddBooks = () => {
	const [formData, setFormData] = useState({
		name: '',
		author: '',
		publisher: '',
		quantity_in_library: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = localStorage.getItem('token');

		if (!token) {
			message.error('Token not found. Please log in again.');
			return;
		}

		try {
			const response = await axios.post(
				'https://s-libraries.uz/api/v1/books/add-books/',
				[formData],
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			message.success('Book added successfully!');
			setFormData({
				name: '',
				author: '',
				publisher: '',
				quantity_in_library: '',
			});
			console.log(response.data);
		} catch (error) {
			console.error('Error:', error);
			message.error('Failed to add the book.');
		}
	};

	return (
		<div className='add-book-wrapper'>
			<div className='add-book-inner'>
				<div className='image-section'>
					<img
						src='https://v0-ezma-project-details.vercel.app/placeholder.svg?height=400&width=300'
						alt='Books Illustration'
					/>
				</div>
				<div className='form-section'>
					<h2>Add New Book</h2>
					<form onSubmit={handleSubmit} className='book-form'>
						<div className='form-field'>
							<input
								type='text'
								name='name'
								placeholder='Book title'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='form-field'>
							<input
								type='text'
								name='author'
								placeholder='Author'
								value={formData.author}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='form-field'>
							<input
								type='text'
								name='publisher'
								placeholder='Publisher'
								value={formData.publisher}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='form-field'>
							<input
								type='number'
								name='quantity_in_library'
								placeholder='Quantity in library'
								value={formData.quantity_in_library}
								onChange={handleChange}
								required
								min={1}
							/>
						</div>
						<button type='submit' className='submit-button'>
							Add Book
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddBooks;
