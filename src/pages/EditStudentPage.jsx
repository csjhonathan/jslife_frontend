/*eslint-disable no-unused-vars */

import {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as api from '../services/api/students.js';
import HeaderContext from '../context/headerContext.js';
import InputMask from 'react-input-mask';
import {useForm} from 'react-hook-form';
import * as classesApi from '../services/api/classes.js';
import {FormTitle, RegisterStudentForm} from '../styles/registerStudentPage/registerStudentStyles.js';
import * as registrationApi from '../services/api/registrations.js';
import dayjs from 'dayjs';

export default function EditStudentPage (){

	const {register, setValue, handleSubmit} = useForm();
	const [classes, setClasses] = useState();
	const {studentId} = useParams();
	const[student, setStudent] = useState();
	const{setHeader} = useContext(HeaderContext);
	const navigate = useNavigate();
	const [currentClass, setCurrentClass] = useState();
	const [currentRegistrarion, setCurrentRegistration] = useState();

	useEffect(()=>{
		getStudent(studentId);
		setHeader(
			<>
				<button onClick={()=> navigate(-1)}>Voltar</button>
			</>
		);
	}, []);

	useEffect(()=>{
		getClasses ();
	},[student]);

	async function getClasses (){
		try {
			const response = await classesApi.getClasses();
			const possibleClasses = response.filter(({id}) => student?.classId <= id);
			setClasses(possibleClasses);
		} catch (error) {
			alert(error);
		}
	}

	async function getStudent (studentId){
		const hash = {
			name: true,
			cpf: true,
			email: true,
			classId: true,
			photo: true
		};
		try {
			const response = await api.getStudentById(studentId);
			setStudent(response);
      
			for(const props in response){
				if(hash[props]){
					setValue(props, response[props]);
				}				
			}

			setCurrentClass(response.classId);
			return setCurrentRegistration(response.currentRegistration);
      
		} catch (error) {
			return alert('Houve um erro inesperado!');
		}
    
	}

	async function editStudent (data){

		if(!data.photo) delete data.photo;

		const formatedCpf = data.cpf.replace(/[.-]/g, '');
		data.cpf = formatedCpf;
		
		try {			
			const response = await api.update(data, studentId);

			if(currentClass!==Number(data.classId)){
				const egress_date = dayjs(Date.now()).format('YYYY-MM-DD');
				await registrationApi.update(currentRegistrarion,egress_date);
			}
			return alert(response.message);
		} catch (error) {
			if(error.status===409 || error.status===422){
				return alert(error.data.message);
			}
			return alert('Houve um erro inesperado!');
		}

	}

	if(!student || !classes) return <div>carregando dados...</div>;
	
	return(
		<>
			<FormTitle>Edição de Aluno</FormTitle>
			<RegisterStudentForm onSubmit={handleSubmit(editStudent)}>
				<div>
					<label htmlFor="name">Nome*: </label>
					<input
						type='text'
						name='name'
						required
						{...register('name')}
					/>
				</div>
				<div>
					<label htmlFor="cpf">CPF*: </label>
					<InputMask
						mask={'999.999.999-99'}
						type='text'
						name='cpf'
						required
						{...register('cpf')}
					/>
				</div>
				<div>
					<label htmlFor="">E-mail*: </label>
					<input
						type='email'
						name='email'
						required
						{...register('email')}
					/>
				</div>
				<div>
					<label htmlFor="">Foto: </label>
					<input
						type='text'
						name='photo'
						{...register('photo')}
					/>
				</div>
				<div>
					<label htmlFor="class">Turma*: </label>
					<select 
						name='class'
						required
						{...register('classId')}
					>
						{classes.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
					</select>
				</div>
				<button>Editar Aluno</button>
			</RegisterStudentForm>
		</>
	);
}