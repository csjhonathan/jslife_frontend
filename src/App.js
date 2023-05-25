import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import RegisterStudentPage from './pages/RegisterStudentPage.jsx';
import StudentsClassPage from './pages/StudentsClassesPage.jsx';
import ResetStyle from './styles/reset.js';
import GlobalStyle from './styles/globalStyles.js';
import Header from './components/Header.jsx';
import StudentPage from './pages/StudentPage.jsx';
import HeaderContext from './context/headerContext.js';
import {useState} from 'react';
import EditStudentPage from './pages/EditStudentPage.jsx';

function App () {
	const [header, setHeader] = useState();
	return (
	
		<HeaderContext.Provider value = {{header, setHeader}}>
			<BrowserRouter>
				<ResetStyle />
				<GlobalStyle />
				<Header>
					{header}
				</Header>
				<Routes>
					<Route path="/" element={<Navigate to="/students/list" />} />
					<Route path='/students/register' element={<RegisterStudentPage />} />
					<Route path="/students/list" element={<StudentsClassPage />}/>
					<Route path="/students/list/:studentId" element={<StudentPage />}/>
					<Route path="/students/edit/:studentId" element={<EditStudentPage />}/>
				</Routes>
			</BrowserRouter>
		</HeaderContext.Provider>		

	);
}

export default App;
