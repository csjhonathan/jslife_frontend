import {BrowserRouter, Routes, Route, 
	Navigate
} from 'react-router-dom';
import RegisterStudentPage from './pages/RegisterStudentPage.jsx';
import StudentsClassPage from './pages/StudentsClassesPage.jsx';
import ResetStyle from './styles/reset.js';
import GlobalStyle from './styles/globalStyles.js';
import Header from './components/Header.jsx';
import StudentPage from './pages/StudentPage.jsx';
import HeaderContext from './context/headerContext.js';
import {useState} from 'react';
import EditStudentPage from './pages/EditStudentPage.jsx';
import DeliveredProjectsPage from './pages/DeliveredProjectsPage.jsx';
import Container from './styles/container.js';
import RoleContext from './context/roleContext.js';
import SignInPage from './pages/SignIn.jsx';
import StudentPageMe from './pages/StudentPageMe.jsx';
import EditStudentPageMe from './pages/EditStudentPageMe.jsx';
import EditPasswordPage from './pages/EditPasswordPage.jsx';
import DeliveredProjectsPageMe from './pages/DeliveredProjectsPageMe.jsx';
import DeliverProjectPageMe from './pages/DeliverProjectPageMe.jsx';
import UpdateRegistrationPage from './pages/RegistrationUpdatePage.jsx';
function App () {
	
	const [header, setHeader] = useState();
	const [role, setRole] = useState(1);

	if(role <= 1){
		return (
			<HeaderContext.Provider value = {{header, setHeader}}>
				<RoleContext.Provider value={{role, setRole}}>
					<BrowserRouter>
						<ResetStyle />
						<GlobalStyle />
						<Header>
							{header}
						</Header>
						<Container>
							<Routes>
								<Route path='/' element ={<SignInPage/>}></Route>
								<Route path='/students/me/:studentId' element={<StudentPageMe/>}></Route>
								<Route path='/students/edit/me/:studentId' element={<EditStudentPageMe/>}></Route>
								<Route path='/students/edit/password/:studentId' element={<EditPasswordPage/>}></Route>
								<Route path='/projects/delivereds/me/:studentId' element={<DeliveredProjectsPageMe/>}></Route>
								<Route path='/projects/deliver/me/:studentId' element={<DeliverProjectPageMe/>}></Route>
							</Routes>
						</Container>
					</BrowserRouter>
				</RoleContext.Provider>
			</HeaderContext.Provider>	
		);
	}

	return (
	
		<HeaderContext.Provider value = {{header, setHeader}}>
			<RoleContext.Provider value={{role, setRole}}>
				<BrowserRouter>
					<ResetStyle />
					<GlobalStyle />
					<Header>
						{header}
					</Header>
					<Container>
						<Routes>
							<Route path="/" element={<Navigate to="/students/list" />} />
							<Route path='/students/register' element={<RegisterStudentPage />} />
							<Route path="/students/list" element={<StudentsClassPage />}/>
							<Route path="/students/list/:studentId" element={<StudentPage />}/>
							<Route path="/students/edit/:studentId" element={<EditStudentPage />}/>
							<Route path="/projects/delivered" element={<DeliveredProjectsPage />}/>
							<Route path="/registration/update/:registrationId/:studentId" element={<UpdateRegistrationPage />}/>
						</Routes>
					</Container>
				</BrowserRouter>
			</RoleContext.Provider>
		</HeaderContext.Provider>		

	);
}

export default App;
