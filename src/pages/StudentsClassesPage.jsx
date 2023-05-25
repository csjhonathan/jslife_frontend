import {useContext, useEffect, useState} from 'react';
import * as studentsApi from '../services/api/students.js';
import * as classesApi from '../services/api/classes.js';
import StudentsList from '../components/StudentsList.jsx';
import {useNavigate} from 'react-router-dom';
import HeaderContext from '../context/headerContext.js';
export default function StudentsClassPage (){

	const{setHeader} = useContext(HeaderContext);

	const [students, setStudents] = useState();
	const [classes, setClasses] = useState();
	const navigate = useNavigate();

	useEffect(()=>{
		getStudents();
		getClasses();
		setHeader(
			<button>voltar</button>
		);
	},[]);

	async function getStudents (classId){
		try {
			const response = await studentsApi.list(classId);
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
		<div>
			<ul>
				<li><button onClick={()=>getStudents()}>Todos</button></li>
				{classes.map(({id, name}) => <li key={id}><button onClick={()=>getStudents(id)}>{name}</button></li>)}
			</ul>

			<StudentsList>
				<ul>
					{students.map(({id, name, class: classname}) => <li key={id} onClick={()=>navigate(`/students/list/${id}`)}>{`${name} - ${classname}`}</li>)}
				</ul>
			</StudentsList>
		</div>
	);

}