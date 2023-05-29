import {useContext, useEffect, useState} from 'react';
import * as api from '../services/api/projects_deliver.js';
import {useNavigate, useParams} from 'react-router-dom';
import {GradeButton,EditIcon,PageTilte,DeliveredListItem, DeliveredList, ListContainer} from '../styles/deliveredProjectsPage/styles.js';
import dayjs from 'dayjs';
import HeaderContext from '../context/headerContext.js';

export default function DeliveredProjectsPageMe (){
	const[projects, setProjects] = useState();
	const {studentId} = useParams();
	const {setHeader} = useContext(HeaderContext);
	const navigate = useNavigate();
	useEffect(()=>{
		setHeader(
			<>
				<button onClick={()=> navigate(`/projects/deliver/me/${studentId}`)}>Entregar Projeto</button>
				<button onClick={()=> navigate(`/students/me/${studentId}`)}>Início</button>
				<button onClick={()=> navigate(-1)}>Voltar</button>
			</>
		);
		getProjects();
	},[]);

	async function getProjects (){
		try {
			const response = await api.listDeliveredProjectsMe(studentId);
			setProjects(response);
		} catch (error) {
			alert(error.data.message);
		}
	}

	function NotGrade (){
		return(
			<>
				Sem Nota
				<EditIcon/>
			</>
		);
	}

	if(!projects) return <div>carregando projetos entregues...</div>;

	return(
		<ListContainer>
			<PageTilte>Meus Projetos</PageTilte>

			<DeliveredList>

				{projects.map(({class_name,deliver_id, delivery_date, grade, project_name, repository})=>{
					return(
						<DeliveredListItem key={deliver_id}>
							<div >{`${project_name} - ${dayjs(delivery_date).format('DD/MM/YYYY')} - ${class_name}`} - <GradeButton grade ={grade}> {grade ? grade : <NotGrade/>}</GradeButton></div>
							<a href={repository}>link do repositório</a>
						</DeliveredListItem>
					);
				})}
			</DeliveredList>
			
		</ListContainer>
	);
}