import { Carousel } from 'antd';
import { useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './about.css';

const About = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const carouselRef = useRef<any>(null);

	const carouselData = [
		{
			title: 'Tashpulatov Bilolbek',
			description:
				'To make knowledge accessible to everyone in Uzbekistan by connecting readers with libraries.',
			image: 'https://images.unsplash.com/photo-1737408011230-995d7a7aca1b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			title: 'Bekpulatov Bekzod',
			description:
				'A dedicated group of developers working to improve access to books and knowledge.',
			image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		},
		{
			title: 'Mirzaahmadov Ubaydulloh',
			description:
				'To create a comprehensive network of libraries across Uzbekistan, making it easier for everyone to find and access books.',
			image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		},
	];

	const faqData = [
		{
			question: 'What is Ezma?',
			answer: 'Ezma is a book search system that helps users find books in libraries across Uzbekistan. It allows you to search for a specific book and see which libraries have it available.',
		},
		{
			question: 'How do I search for a book?',
			answer: 'You can search for a book by entering the title, author, or keywords in the search bar on the home page. The system will show you a list of libraries that have the book available.',
		},
		{
			question: 'Is Ezma free to use?',
			answer: 'Yes, Ezma is completely free for all users. Our goal is to make knowledge more accessible to everyone in Uzbekistan.',
		},
		{
			question: 'How can libraries join the system?',
			answer: 'Libraries can register on our platform by clicking the "Register" button and following the registration process for librarians. After approval by our admin team, the library will be added to our system.',
		},
		{
			question: 'Can I borrow books through Ezma?',
			answer: 'Ezma does not handle the borrowing process directly. It helps you find which libraries have the book you are looking for. You will need to visit the library or contact them directly to borrow the book.',
		},
		{
			question: 'How accurate is the book availability information?',
			answer: 'Our system relies on librarians to keep their book inventory up to date. Most libraries update their information regularly, but we recommend contacting the library to confirm availability before making a special trip.',
		},
	];

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const nextSlide = () => {
		carouselRef.current?.next();
	};

	const prevSlide = () => {
		carouselRef.current?.prev();
	};

	return (
		<div className='container mt-5'>
			<div className='about-ezma'>
				<h2>About Ezma</h2>
				<p>
					Ezma is a comprehensive book search system designed to connect readers
					with libraries across Uzbekistan. Our mission is to make knowledge
					more accessible by helping users find the books they need in the
					nearest libraries.
				</p>
				<p>
					With Ezma, you can search for any book and instantly discover which
					libraries have it available. This saves time and effort that would
					otherwise be spent visiting multiple libraries to find a specific
					book.
				</p>
				<p>
					Our platform also helps libraries showcase their collections and
					connect with more readers, promoting a culture of reading and learning
					throughout Uzbekistan.
				</p>
			</div>

			<div className='carousel-container'>
				<Carousel
					ref={carouselRef}
					autoplay
					dots={true}
					arrows={true}
					effect='fade'
				>
					{carouselData.map((slide, index) => (
						<div key={index} className='carousel-slide'>
							<img
								src={slide.image}
								alt={slide.title}
								className='carousel-image'
							/>
							<div className='carousel-text'>
								<h2>{slide.title}</h2>
								<p>{slide.description}</p>
							</div>
						</div>
					))}
				</Carousel>
				<button className='carousel-button prev' onClick={prevSlide}>
					<FaChevronLeft />
				</button>
				<button className='carousel-button next' onClick={nextSlide}>
					<FaChevronRight />
				</button>
			</div>

			<div className='faq-container'>
				<h2>Frequently Asked Questions</h2>
				<div className='faq-list'>
					{faqData.map((faq, index) => (
						<div key={index} className='faq-item'>
							<div
								className='faq-question'
								onClick={() => toggleFAQ(index)}
							>
								{faq.question}
								<span className='arrow'>
									{openIndex === index ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)}
								</span>
							</div>
							{openIndex === index && (
								<div className='faq-answer'>{faq.answer}</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
