import {useNavigate, useParams} from 'react-router-dom';
import * as api from '../services/api/students.js';
import {useContext, useEffect, useState} from 'react';
import HeaderContext from '../context/headerContext.js';
import dayjs from 'dayjs';
export default function StudentPage (){

	const {studentId} = useParams();
	const[student, setStudent] = useState();
	const{setHeader} = useContext(HeaderContext);
	const navigate = useNavigate();

	useEffect(()=>{
		getStudent(studentId);
		setHeader(
			<>
				<button onClick={()=>navigate(`/students/edit/${studentId}`)}>Editar</button>
				<button onClick={()=> navigate(-1)}>Voltar</button>
			</>
		);
	}, []);

	if(!student) return <div>carregando dados do aluno...</div>;
	async function getStudent (studentId){
		try {
			const response = await api.getStudentById(studentId);
			return setStudent(response);
		} catch (error) {
			return alert(error.data.message);
		}
	}

	return(
		<div>
			<h1>Dados de Estudante</h1>

			{student.photo ?? <img src="qqcoisa"/>}

			<p>Nome Completo: {student.name}</p>
			<p>CPF: {student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')}</p>
			<p>E-mail: {student.email}</p>

			<p>Turmas: </p>
			{student.registrations?.length ?
				student.registrations.map(({id, class: class_name, entry_date, egress_date})=>{
					return (
						<div key={id}>
							<p >Turma: {class_name}</p>
							<p>Data de ingresso: {dayjs(entry_date).format('DD/MM/YYYY')}</p>
							<p>Data de saída: {egress_date ? dayjs(egress_date).format('DD/MM/YYYY') : '-'}</p>
						</div>
					);
				})
				:
				<p>Este aluno ainda não foi matriculado!</p>
			}
		</div>
	);
}