import {useContext, useEffect, useState} from 'react';
import * as studentsApi from '../services/api/students.js';
import * as classesApi from '../services/api/classes.js';
import {useNavigate} from 'react-router-dom';
import HeaderContext from '../context/headerContext.js';
import StudentsList from '../components/StudentsList.jsx';
import {ClassTitle, ListContainer, SelectClassesMenu, StudentsListContainer,StudentsListItem} from '../styles/studentsListPage/styles.js';
export default function StudentsClassPage (){

	const{setHeader} = useContext(HeaderContext);

	const [students, setStudents] = useState();
	const [classes, setClasses] = useState();
	const navigate = useNavigate();
	const [class_name, setClassName] = useState('');
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
			if(class_name){
				setClassName(class_name);
			}
			console.log(response);
			return setStudents(response);
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

	if(!students || !classes) return <div>carregando alunos e turmas...</div>;

	return (
		<StudentsListContainer>
			<SelectClassesMenu>
				<li><button onClick={()=>{
					getStudents();
					setClassName('');
				}}>Todos</button></li>
				{classes.map(({id, name}) => <li key={id}><button onClick={()=>getStudents(id, name)}>{name}</button></li>)}
			</SelectClassesMenu>

			<StudentsList>
				<ClassTitle>Estudantes {class_name ? `da ${class_name}` : 'de Todas as Turmas'}</ClassTitle>
				<ListContainer>
					{students.length ? 
						students.map(({id, name, class: classname, registered}) => <StudentsListItem registered = {registered} key={id} onClick={()=>navigate(`/students/list/${id}`)}>{`${name} - ${classname} - ${registered ? 'Matriculado' : 'Não Matriculado'}`}</StudentsListItem>)	
						:
						'Não há alunos nesta turma...'
					}
				</ListContainer>
			</StudentsList>
		</StudentsListContainer>
	);

}