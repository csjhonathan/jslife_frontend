import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterStudentPage from './pages/RegisterStudentPage.jsx';
import StudentsClassPage from './pages/StudentsClassesPage.jsx';
import ResetStyle from './styles/reset.js';
import GlobalStyle from './styles/globalStyles.js';
import Header from './components/Header.jsx';
function App () {
	return (
		<div>

			<BrowserRouter>
				<ResetStyle />
				<GlobalStyle />
				<Header/>
				<Routes>
					<Route path='/students/register' element={<RegisterStudentPage />} />
					<Route path="students/list" element={<StudentsClassPage />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
