import {useContext, useEffect, useState} from 'react';
import * as studentsApi from '../services/api/students.js';
import * as classesApi from '../services/api/classes.js';
import * as registrationApi from '../services/api/registrations.js';
import {useNavigate} from 'react-router-dom';
import HeaderContext from '../context/headerContext.js';
import StudentsList from '../components/StudentsList.jsx';
import {ClassTitle, ListContainer, SelectClassesMenu, StudentsListContainer,StudentsListItem} from '../styles/studentsListPage/styles.js';
export default function StudentsClassPage (){

	const{setHeader} = useContext(HeaderContext);

	const [students, setStudents] = useState({registereds: [], notRegistereds: []});
	const [classes, setClasses] = useState();
	const navigate = useNavigate();
	const [class_name, setClassName] = useState('');
	const [seeRegistereds, setSeeRegistereds] = useState(true);
	
	useEffect(()=>{
		getStudents();
		getClasses();
		setHeader(
			<>
				<button onClick={()=> navigate('/students/register')}>Cadastrar Estudante</button>
				<button onClick={()=> navigate('/projects/deliver')}>Entregar Projeto</button>
				<button onClick={()=> navigate('/projects/delivered')}>Ver projetos Entregues</button>
				<button onClick={()=> navigate(-1)}>voltar</button>
			</>
		);
	},[]);

	async function getStudents (classId, class_name){
		try {

			const response = await studentsApi.list(classId);
			const registereds = response.filter(({isRegistered}) => isRegistered);
			const notRegistereds = response.filter(({isRegistered}) => !isRegistered);
			if(class_name){
				setClassName(class_name);
			}

			return setStudents({registereds, notRegistereds});
		} catch (error) {
			return alert(error.data.message);
		}
	}

	async function getClasses (){
		try {
			const response = await classesApi.getClasses();
			setClasses(response);
		} catch (error) {
			alert(error);
		}
	}

	function handleView (){
		setSeeRegistereds(!seeRegistereds);
	}

	async function approveRegistrarion (studentId, class_id){
		try {
			await registrationApi.create({studentId, class_id});
			getStudents();
			alert('Matricula aprovada!');
		} catch (error) {
			alert(error);
		}
	}
	if((!students.notRegistereds?.length && !students.registereds?.length) && !classes) return <div>carregando alunos e turmas...</div>;
	
	if(!seeRegistereds){
		return(
			<StudentsListContainer>
	
				<SelectClassesMenu>
					<li><button onClick={handleView}
						disabled = {!students.registereds.length}
					>{seeRegistereds ? `Ver matrículas pendentes (${students.notRegistereds.length})` : `Ver alunos matriculados (${students.registereds.length})`}</button></li>
					<li><button onClick={()=>{
						getStudents();
						setClassName('');
					}}>Todos</button></li>
					{classes.map(({id, name}) => <li key={id}><button onClick={()=>getStudents(id, name)}>{name}</button></li>)}
				</SelectClassesMenu>
				<StudentsList>
					<ClassTitle>Estudantes {class_name ? `da ${class_name}` : 'de Todas as Turmas'}</ClassTitle>
					<ListContainer>
						{students.notRegistereds.length ? 
							students.notRegistereds.map(({id, name, class_name, isRegistered, registration_class_id}) => {
								return(
									<StudentsListItem 
										registered = {isRegistered} 
										key={id}>{`${name} ${class_name ? `- ${class_name}` : ''} - ${isRegistered ? 'Matriculado(a)' : 'Não Matriculado(a)'}`} -  
										<button onClick={()=> {
											return approveRegistrarion(id, registration_class_id);
										}}>APROVAR MATRICULA</button></StudentsListItem>
								);
							})	
							:
							'Não há alunos nesta turma...'
						}
					</ListContainer>
				</StudentsList>
			</StudentsListContainer>
		);
	}

	if(seeRegistereds){
		return (
			<StudentsListContainer>
				<SelectClassesMenu>
					<li><button onClick={handleView}
						disabled = {!students.notRegistereds.length}
					>{seeRegistereds ? `Ver matrículas pendentes (${students.notRegistereds.length})` : 'Ver alunos matriculados'}</button></li>
					<li><button onClick={()=>{
						getStudents();
						setClassName('');
					}}>Todos</button></li>
					{classes?.map(({id, name}) => <li key={id}><button onClick={()=>getStudents(id, name)}>{name}</button></li>)}
				</SelectClassesMenu>

				<StudentsList>
					<ClassTitle>Estudantes {class_name ? `da ${class_name}` : 'de Todas as Turmas'}</ClassTitle>
					<ListContainer>
						{students.registereds.length ? 
							students.registereds.map(({id, name, class_name, isRegistered}) => <StudentsListItem registered = {isRegistered} key={id} onClick={()=>navigate(`/students/list/${id}`)}>{`${name} ${class_name ? `- ${class_name}` : ''} - ${isRegistered ? 'Matriculado(a)' : 'Não Matriculado(a)'}`}</StudentsListItem>)	
							:
							'Não há alunos nesta turma...'
						}
					</ListContainer>
				</StudentsList>
			</StudentsListContainer>
		);
	}

}