import {useForm} from 'react-hook-form';
import {
	RegisterStudentForm,
	FormTitle
} from '../styles/registerStudentPage/registerStudentStyles.js';
import * as classesApi from '../services/api/classes.js';
import * as studentsApi from '../services/api/students.js';
import {useEffect, useState} from 'react';
import InputMask from 'react-input-mask';


export default function RegisterStudentPage (){
	const {register, handleSubmit, setValue} = useForm();
	const [classes, setClasses] = useState();

	useEffect(()=>{
		getClasses();
	},[]);

	async function registerStudent (data){

		if(!data.photo) delete data.photo;

		const formatedCpf = data.cpf.replace(/[.-]/g, '');
		data.cpf = formatedCpf;

		try {
			const response = await studentsApi.create(data);

			for(const props in data){
				setValue(`...${props}`, '');
			}

			return alert(response.message);
		} catch (error) {
			if(error.status===409 || error.status===422){
				return alert(error.data.message);
			}
			return alert('Houve um erro inesperado!');
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

	if(!classes) return <div>carregado turmas</div>;

	return(
		<>
			<FormTitle>Cadastro de Aluno</FormTitle>
			<RegisterStudentForm onSubmit={handleSubmit(registerStudent)}>
				<div>
					<label htmlFor="name">Nome*:</label>
					<input
						type='text'
						name='name'
						required
						{...register('name')}
					/>
				</div>
				<div>
					<label htmlFor="cpf">CPF*:</label>
					<InputMask
						mask={'999.999.999-99'}
						type='text'
						name='cpf'
						required
						{...register('cpf')}
					/>
				</div>
				<div>
					<label htmlFor="">E-mail*:</label>
					<input
						type='email'
						name='email'
						required
						{...register('email')}
					/>
				</div>
				<div>
					<label htmlFor="">Foto:</label>
					<input
						type='text'
						name='photo'
						{...register('photo')}
					/>
				</div>
				<div>
					<label htmlFor="class">Turma*:</label>
					<select 
						name='class'
						required
						{...register('classId')}
					>
						{classes.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
					</select>
				</div>
				<button>Cadastrar Aluno</button>
			</RegisterStudentForm>
		</>
	);
}