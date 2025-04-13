import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import Footer from './pages/footer/Footer';
import Header from './pages/header/Header';
import Home from './pages/home/Home';
import LibraryList from './pages/libraryList/LibraryList';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/libraryList' element={<LibraryList />} />
			</Routes>
			<Footer />
		</QueryClientProvider>
	);
};

export default App;
