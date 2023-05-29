/*eslint-disable no-unused-vars*/

import {useEffect, useState, useContext} from 'react';
import {useForm} from 'react-hook-form';
import * as classesApi from '../services/api/classes.js';
import * as studentsApi from '../services/api/students.js';
import * as projectsApi from '../services/api/projects.js';
import * as api from '../services/api/projects_deliver.js';
import HeaderContext from '../context/headerContext.js';
import {useNavigate, useParams} from 'react-router-dom';
import {DeliverLabel,DeliverButton, DeliverForm, DeliverPojectPageTilte, DeliverProjectContainer, DeliverSelect, InputContainer, RepositoryInput} from '../styles/projectDeliveryPage/styles.js';


export default function DeliverProjectPageMe (){
	const{setHeader} = useContext(HeaderContext);
	const {register, handleSubmit} = useForm();
	const [classes, setClasses] = useState();
	const [students, setStudents] = useState();
	const [projects, setProjects] = useState();
	const navigate = useNavigate();
	const {studentId} = useParams();
	useEffect(()=>{
		getClasses();
		getProjects();
		setHeader(
			<>
				<button onClick={()=> navigate(`/students/me/${studentId}`)}>Início</button>
				<button onClick={()=> navigate(-1)}>Voltar</button>
			</>
		);
	},[]);

	async function getClasses (){
		try {
			const response = await classesApi.getClasses();
			return setClasses(response);
		} catch (error) {
			return alert(error.data.message);
		}
	}

	async function getStudents (classId){
		try {
			const response = await studentsApi.list(classId);
			return setStudents(response);
		} catch (error) {
			return alert(error.data.message);
		}
	}

	async function getProjects (){
		try {
			const response = await projectsApi.list();
			return setProjects(response);
		} catch (error) {
			return alert(error.data.message);
		}
	}

	async function sendProject (data){
		for(const props in data){
			if(isNaN(data[props]) && props !== 'repository'){
				return alert('Verifique se você selecionou os dados da entrega corretamente!');
			}
		}
		try {
			await api.deliver(data);
			return alert('Seu projeto foi enviado!');
		} catch (error) {
			return alert(error.data.message);
		}
	}

	function handleChange (e){
		const {value} = e.target;
		if(isNaN(value)) return;
		getStudents (value);
	}

	return(
		<DeliverProjectContainer>
			<DeliverPojectPageTilte>Entrega de Projeto</DeliverPojectPageTilte>
			<DeliverForm onSubmit={handleSubmit(sendProject)}>
				<InputContainer>
					<DeliverLabel htmlFor="class">Selecione sua turma: </DeliverLabel>
					<DeliverSelect 
						name="class"
						{...register('class_id')}
						onChange={handleChange}
						required
					><option value={'Turmas'}>Selecione a turma: </option>	
						{classes?.length && classes.map(({id, name})=>{
							return <option key={id} value={id}>{name}</option>;
						})}</DeliverSelect>

				</InputContainer>
				<InputContainer>
					<DeliverLabel htmlFor="name">Selecione seu nome: </DeliverLabel>
					<DeliverSelect 
						name="name" 
						{...register('student_id')}
						required
					>
						<option value={'alunos'}>Selecione o seu nome: </option>
						{students?.length && students.map(({id, name})=>{
							return <option key={id} value={id}>{name}</option>;
						})}</DeliverSelect>
				</InputContainer>
				<InputContainer>
					<DeliverLabel htmlFor="project">Selecione o projeto: </DeliverLabel>
					<DeliverSelect 
						name="project"
						{...register('project_id')}
						required
					>
						<option value={'Projetos'}>Selecione o projeto: </option>
						{projects?.length && projects.map(({id, name})=>{
							return <option key={id} value={id}>{name}</option>;
						})}</DeliverSelect>
				</InputContainer>
				<InputContainer>
					<DeliverLabel htmlFor="repository">Link do repositório: </DeliverLabel>
					<RepositoryInput 
						type="text" 
						name="repository"
						required
						placeholder='Link do repositório...'
						{...register('repository')}
					/>
				</InputContainer>
	
				<DeliverButton>Entregar</DeliverButton>
			</DeliverForm>
		</DeliverProjectContainer>
	);
}