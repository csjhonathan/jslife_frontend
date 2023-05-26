import {useForm} from 'react-hook-form';
import * as classesApi from '../services/api/classes.js';
import * as studentsApi from '../services/api/students.js';
import {useContext, useEffect, useState} from 'react';
import InputMask from 'react-input-mask';
import {
	FormTitle, 
	RegisterStudentForm,
	FormContainer,
	InputContainer,
	RegisterButton
} from '../styles/registerStudentPage/styles.js';
import HeaderContext from '../context/headerContext.js';
import {useNavigate} from 'react-router-dom';
export default function RegisterStudentPage (){

	const {register, handleSubmit, setValue} = useForm();
	const [classes, setClasses] = useState();
	const {setHeader} = useContext(HeaderContext);
	const navigate = useNavigate();
	
	useEffect(()=>{
		getClasses();
		setHeader(
			<button onClick={()=> navigate(-1)}>Voltar</button>
		);
	},[]);

	async function registerStudent (data){

		if(!data.photo) delete data.photo;
		if(isNaN(data.classId)) return alert('Selecione uma turma válida!');
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
		<FormContainer>
			<FormTitle>Cadastro de Estudante</FormTitle>
			<RegisterStudentForm onSubmit={handleSubmit(registerStudent)}>
				<InputContainer>
					<label htmlFor="name">Nome (obrigatório):</label>
					<input
						type='text'
						name='name'
						required
						placeholder='nome e sobrenome...'
						{...register('name')}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor="cpf">CPF (obrigatório):</label>
					<InputMask
						mask={'999.999.999-99'}
						type='text'
						name='cpf'
						required
						placeholder='999.999.999-99'
						{...register('cpf')}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor="">E-mail (obrigatório):</label>
					<input
						type='email'
						name='email'
						required
						placeholder='email do aluno...'
						{...register('email')}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor="">Foto (opcional):</label>
					<input
						type='text'
						name='photo'
						placeholder='envie aqui o link da foto do aluno...'
						{...register('photo')}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor="class">Turma (obrigatório) :</label>
					<select 
						name='class'
						required
						{...register('classId')}
					><option value={'Turmas'}>Turmas: </option>
						{classes.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
					</select>
				</InputContainer>
				<RegisterButton>CADASTRAR</RegisterButton>
			</RegisterStudentForm>
		</FormContainer>
	);
}