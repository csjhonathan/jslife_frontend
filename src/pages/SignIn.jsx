import {useForm} from 'react-hook-form';
import {FormArea, Input, LoginInButton, FormContainer, Logo} from '../styles/SignInPage/styles.js';
import * as api from '../services/api/students.js';
import {useContext, useState} from 'react';
import RoleContext from '../context/roleContext.js';
import {useNavigate} from 'react-router-dom';
export default function SignInPage (){
	const {register, handleSubmit} = useForm();
	const {role, setRole} = useContext(RoleContext);
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();

	async function loginIn (data){
		setDisabled(true);
		try {
			const response = await api.signIn(data);
			if(response.role_id === role && role ===1){
				const {token} = response;
				localStorage.setItem('js_life_token', JSON.stringify(token));
				return navigate(`/students/me/${response.id}`);
			}
			return setRole(response.role);
		} catch (error) {
			if(error.status === 401){
				setDisabled(false);
				return alert(error.data.message);
			}
			return alert ('Houve um erro inesperado!');
		}
	}
	return(
		<FormContainer>
			<Logo>JS_LIFE</Logo>
			<FormArea onSubmit = {handleSubmit(loginIn)}>
				<Input
					type='email'
					required
					placeholder='email...'
					disabled={disabled}
					{...register('email')}
				/>
				<Input
					type='password'
					required
					placeholder='senha...'
					disabled={disabled}
					{...register('password')}
				/>
				<p>LEMBRETE: Se você nunca alterou sua senha, ela será seu CPF por padrão!</p>

				<LoginInButton>Acessar Conta</LoginInButton>
			</FormArea>
		</FormContainer>
	);
}