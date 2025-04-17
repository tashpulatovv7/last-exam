import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, useLocation } from 'react-router-dom';
import About from './pages/about/About';
import Footer from './pages/footer/Footer';
import Header from './pages/header/Header';
import Home from './pages/home/Home';
import LibraryDetail from './pages/libraryDetails/LibraryDetails';
import LibraryList from './pages/libraryList/LibraryList';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Registration from './pages/register/Register';

const App = () => {
	const queryClient = new QueryClient();
	const location = useLocation();

	const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

	return (
		<QueryClientProvider client={queryClient}>
			{!hideHeaderFooter && <Header />}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/libraryList' element={<LibraryList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Registration />} />
				<Route path='/library/:id' element={<LibraryDetail />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>

			{!hideHeaderFooter && <Footer />}
		</QueryClientProvider>
	);
};

export default App;
