/*eslint-disable no-unused-vars */

import {useContext, useEffect, useState} from 'react';
import HeaderContext from '../context/headerContext.js';
import {useNavigate} from 'react-router-dom';
import * as classesApi from '../services/api/classes.js';
import * as projectsApi from '../services/api/projects.js';
import DeliveredProjectsList from '../components/DeliveredProjectsList.jsx';

export default function DeliveredProjectsPage (){
	const navigate = useNavigate();
	const {setHeader} = useContext(HeaderContext);
	const [classes, setClasses] = useState();
	const [projects, setProjects] = useState();
	const [classParams, setClassParams] = useState({classId: '',  class_name: ''});
	const [projectsParams, setProjectsParams] = useState({projectId: '', project_name: ''});

	useEffect(()=>{
		setHeader(
			<>
				<button onClick={()=> navigate(-1)}>Voltar</button>
			</>
		);
		getProjects();
		getClasses();
	},[]);
  
	async function getProjects (){
		try {
			const response = await projectsApi.list();
			setProjects(response);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	async function getClasses (){
		try {
			const response = await classesApi.getClasses();
			console.log(response);
			setClasses(response);
		} catch (error) {
			console.log(error);
		}
	}

	function handleClassParams (param){
		if(classParams.classId === param.classId){
			return setClassParams({classId: '',  class_name: ''});
		}
		return setClassParams(param);
	}

	function handleProjectsParams (param){
		if(projectsParams.projectId === param.projectId){
			return setProjectsParams({projectId: '', project_name: ''});
		}
		return setProjectsParams(param);
	}

	function handleView (){
		setClassParams({classId: '',  class_name: ''});
		setProjectsParams({projectId: '', project_name: ''});
	}

	if(!projects || !classes) return <div>carregando dados...</div>;

	return (
		<>
			<button onClick={handleView}>Ver todos</button>
			<div>
				<ul>
					{classes.map(({id, name})=>{
						return <li key={id}> <button onClick={()=>handleClassParams({classId: id, class_name: name})}>Turma: {name}</button></li>;
					})}
				</ul>
			</div>
			<div>
				<ul>
					{projects.map(({id, name})=>{
						return <li key={id}><button onClick={()=>handleProjectsParams({projectId: id, project_name: name})}> Projeto: {name}</button></li>;
					})}
				</ul>
			</div>
			<DeliveredProjectsList 
				classId ={classParams.classId} 
				class_name={classParams.class_name}

				projectId = {projectsParams.projectId}
				project_name={projectsParams.project_name}
			/>
		</>
	);
}