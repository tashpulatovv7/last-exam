import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import './about.css';

const About = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

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
			answer: 'Libraries can register on our platform by clicking the << Register >> button and following the registration process for librarians. After approval by our admin team, the library will be added to our system.',
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
