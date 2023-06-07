import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import NotFound from './pages/NotFound';
import Score from './pages/Score';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/test' element={<Test />} />
			<Route path='/score' element={<Score />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default App;
