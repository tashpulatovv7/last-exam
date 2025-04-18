import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from './pages/about/About';
import AddBooks from './pages/addbooks/AddBooks';
import Footer from './pages/footer/Footer';
import Header from './pages/header/Header';
import Home from './pages/home/Home';
import LibraryDetail from './pages/libraryDetails/LibraryDetails';
import LibraryList from './pages/libraryList/LibraryList';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Registration from './pages/register/Register';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
	return isLoggedIn ? children : <Navigate to='/login' replace />;
};

const App = () => {
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
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<Profile />
							<Route path='/addbooks' element={<AddBooks />} />
						</PrivateRoute>
					}
				/>
			</Routes>

			{!hideHeaderFooter && <Footer />}
		</QueryClientProvider>
	);
};

export default App;
