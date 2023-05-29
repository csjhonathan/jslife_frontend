import {useNavigate, useParams} from 'react-router-dom';
import * as api from '../services/api/students.js';
import {useContext, useEffect, useState} from 'react';
import HeaderContext from '../context/headerContext.js';
import dayjs from 'dayjs';
import {StudentImg, ClassItem, ClassLabel, ClassesList, PageTitle, StudentContainer, StudentData, StudentDataContainer, StudentLogo} from '../styles/studentPageMe/styles.js';
import nameFormater from '../helpers/nameFormater.js';
import UseLogout from '../helpers/logout.js';

export default function StudentPageMe (){
	const {studentId} = useParams();
	const[student, setStudent] = useState();
	const{setHeader} = useContext(HeaderContext);
	const navigate = useNavigate();
	const [logout, setLogout] = UseLogout();

	useEffect(()=>{
		getStudent(studentId);
		setHeader(
			<>
				<button onClick={()=> navigate(`/students/edit/me/${studentId}`)}>Editar</button>
				<button onClick={()=> navigate(`/projects/delivereds/me/${studentId}`)}>Ver projetos entregues</button>
				<button onClick={()=> navigate(`/projects/deliver/me/${studentId}`)}>Entregar projeto</button>
				<button onClick={()=> setLogout(!logout)}>Sair</button>
			</>
		);
	}, []);

	if(!student) return <div>carregando dados...</div>;
	async function getStudent (studentId){
		try {
			const response = await api.getStudentById(studentId);
			return setStudent(response);
		} catch (error) {
			return alert(error.data.message);
		}
	}

	return(
		<StudentContainer>
			<PageTitle>Seus dados</PageTitle>

			<StudentDataContainer>

				{student.photo ? <StudentLogo><StudentImg src={student.photo}/></StudentLogo> : <StudentLogo>{nameFormater(student.name)}</StudentLogo>}

				<StudentData>
					<p>Nome Completo: {student.name}</p>
					<p>CPF: {student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')}</p>
					<p>E-mail: {student.email}</p>
				</StudentData>

				{student.registrations?.length ?
					<>
						<ClassLabel>Turmas: </ClassLabel>
						<ClassesList>
							{
								student.registrations.map(({id, class: class_name, entry_date, egress_date})=>{
									return (
										<ClassItem key={id} isCurrent = {!egress_date}>
											<p >Turma: {class_name}</p>
											<p>Data de ingresso: {dayjs(entry_date).format('DD/MM/YYYY')}</p>
											<p>Data de saída: {egress_date ? dayjs(egress_date).format('DD/MM/YYYY') : '-'}</p>
										</ClassItem>
									);
								})
							}
						</ClassesList>
					</>
					:
					<p>Sua matrícula ainda não foi aprovada...</p>
				}
			</StudentDataContainer>
		</StudentContainer>
	);
}