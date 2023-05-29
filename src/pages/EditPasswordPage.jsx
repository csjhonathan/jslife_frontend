import {useForm} from 'react-hook-form';
import {FormContainer, EditFormTitle, EditPasswordForm, EditInputContainer, EditPasswordButton} from '../styles/editPasswordPage/styles.js';
import {useContext, useEffect} from 'react';
import HeaderContext from '../context/headerContext.js';
import {useNavigate, useParams} from 'react-router-dom';
import * as api from '../services/api/students.js';

export default function EditPasswordPage (){
	const {register, handleSubmit, setFocus} = useForm();
	const {setHeader} = useContext(HeaderContext);
	const navigate = useNavigate();
	const {studentId} = useParams();
	useEffect(()=>{
		setHeader(
			<>
				<button onClick={()=>navigate(-1)}>Voltar</button>
			</>
		);
	},[]);
	async function editPassword ({currentPassword, newPassword, confirmNewPassword}){
		if(newPassword!==confirmNewPassword){
			alert('as senhas não coincidem');
			return setFocus('newPassword');
		}
		try {
			await api.updatePassword({currentPassword, newPassword, confirmNewPassword},studentId);
			alert('Senha alterada com sucesso!');
			return navigate(`/students/me/${studentId}`);
		} catch (error) {
			return alert(error.data.message);
		}
	}
	return(
		<FormContainer>
			<EditFormTitle>Editar Senha</EditFormTitle>
			<EditPasswordForm onSubmit={handleSubmit(editPassword)}>
				<EditInputContainer>
					<input type="password" 
						placeholder='digite a senha atual...'
						{...register('currentPassword')}
					/>
				</EditInputContainer>
				<EditInputContainer>
					<input type="password" 
						placeholder='digite sua nova senha'
						{...register('newPassword')}
					/>
				</EditInputContainer>
				<EditInputContainer>
					<input type="password" 
						placeholder='confirme sua nova senha'
						{...register('confirmNewPassword')}
					/>
				</EditInputContainer>

				<EditPasswordButton>Editar Senha</EditPasswordButton>
			</EditPasswordForm>
		</FormContainer>
	);
}