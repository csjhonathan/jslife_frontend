/*eslint-disable no-unused-vars*/

import {useEffect, useState, useContext} from 'react';
import {useForm} from 'react-hook-form';
import * as classesApi from '../services/api/classes.js';
import * as studentsApi from '../services/api/students.js';
import * as projectsApi from '../services/api/projects.js';
import * as api from '../services/api/projects_deliver.js';
import HeaderContext from '../context/headerContext.js';
import {useNavigate} from 'react-router-dom';

export default function ProjectDeliveryPage (){

	const{setHeader} = useContext(HeaderContext);
	const {register, handleSubmit} = useForm();
	const [classes, setClasses] = useState();
	const [students, setStudents] = useState();
	const [projects, setProjects] = useState();
	const navigate = useNavigate();

	useEffect(()=>{
		getClasses();
		getProjects();
		setHeader(
			<button onClick={()=> navigate(-1)}>Voltar</button>
		);
	},[]);

	async function getClasses (){
		try {
			const response = await classesApi.getClasses();
			return setClasses(response);
		} catch (error) {
			return console.log(error);
		}
	}

	async function getStudents (classId){
		try {
			const response = await studentsApi.list(classId);
			return setStudents(response);
		} catch (error) {
			return console.log(error);
		}
	}

	async function getProjects (){
		try {
			const response = await projectsApi.list();
			return setProjects(response);
		} catch (error) {
			return console.log(error);
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
			return console.log(error);
		}
	}

	function handleChange (e){
		const {value} = e.target;
		if(isNaN(value)) return;
		getStudents (value);
	}

	return(
		<>
			<h1>Entrega de Projeto</h1>
			<form onSubmit={handleSubmit(sendProject)}>
				<label htmlFor="class">Selecione sua turma: </label>
				<select 
					name="class"
					{...register('class_id')}
					onChange={handleChange}
					required
				>
					<option value={'Turmas'}>Selecione a turma: </option>	
					{classes?.length && classes.map(({id, name})=>{
						return <option key={id} value={id}>{name}</option>;
					})}</select>

				<label htmlFor="name">Selecione seu nome: </label>
				<select 
					name="name" 
					{...register('student_id')}
					required
				>
					<option value={'alunos'}>Selecione o seu nome: </option>
					{students?.length && students.map(({id, name})=>{
						return <option key={id} value={id}>{name}</option>;
					})}</select>

				<label htmlFor="project">Selecione o projeto: </label>
				<select 
					name="project"
					{...register('project_id')}
					required
				>
					<option value={'Projetos'}>Selecione o projeto: </option>
					{projects?.length && projects.map(({id, name})=>{
						return <option key={id} value={id}>{name}</option>;
					})}</select>

				<label htmlFor="repository">Link do repositório: </label>
				<input 
					type="text" 
					name="repository"
					required
					{...register('repository')}
				/>
				<button>Entregar</button>
			</form>
		</>
	);
}