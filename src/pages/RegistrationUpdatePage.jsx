import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import * as classesApip from '../services/api/classes.js';
import * as api from '../services/api/registrations.js';
import * as studentApi from '../services/api/students.js';
export default function UpdateRegistrationPage (){
	const {registrationId, studentId} = useParams();
	const {register, handleSubmit} = useForm();
	const [classes, setClasses] = useState();
	const navigate = useNavigate();
	const [student, setStudent] = useState();

	useEffect(()=>{
		getClasses();
		getStudent();
	},[]);

	if(!student) return <div>carregando dados...</div>;

	async function getStudent (){
		try {
			const response = await studentApi.getStudentById(studentId);
			console.log(response);
			return setStudent(response);
		} catch (error) {
			return  console.log(error);
		}
	}
	async function handleRegister (data){
		const timestamp = dayjs().valueOf();
		if(isNaN(data.class_id)) return alert('Selecione uma opção válida');
		try {
			if(Number(data.class_id) === 0 && window.confirm('Deseja mesmo fechar a matrícula?')){
				const response = await api.close(registrationId,{egress_date: timestamp, student_id: studentId});
				alert(response.message);
				return navigate('/students/list');
			}

			const response = await api.update(registrationId,{egress_date: timestamp, student_id: studentId, class_id: data.class_id});
			alert(response.message);
			return navigate(`/students/list/${studentId}`);
		} catch (error) {
			if(error.status === 401){
				return alert(error.data.message);
			}
			return alert('Houve um erro interno!');
		}
	}

  
	async function getClasses (){
		try {
			const response = await classesApip.getClasses();
			return setClasses(response);
		} catch (error) {
			return console.log(error);
		}
	}
	if(!classes) return <div>Carregando turmas...</div>;
	return(
		<form onSubmit = {handleSubmit(handleRegister)}>

			<h1>Alterando a matrícula de {`${student.name}`} que atualmente se encontra na turma {`${student.currentRegistration.class}`}</h1>
			<div>
				<select name="" id=""
					{...register('class_id')}
				>
					<option value="void">Selecione a nova turma ou finalizar para encerrar a matrícula:</option>
					{classes.map(({id, name})=>{
						return <option value={id} key={id}>{name}</option>;
					})}
					<option value={0}>FINALIZAR MATRÍCULA</option>
				</select>
			</div>
      
			<button>Alterar matrícula</button>
		</form>
	);
}