import {useState, useContext, useEffect} from 'react';
import HeaderContext from '../context/headerContext.js';
import {useNavigate} from 'react-router-dom';
import RoleContext from '../context/roleContext.js';
export default function UseLogout (boolean){
	const {setHeader} = useContext(HeaderContext);
	const {setRole} = useContext(RoleContext);
	const [logout, setLogout] = useState(boolean);
	const navigate = useNavigate();
	useEffect(()=>{
		if(logout){
			localStorage.setItem('js_life_token', null);
			sessionStorage.setItem('js_life_token', null);
			setHeader(null);
			setRole(1);
			navigate('/');
		}
	},[logout]);
	
	const handleLogout = newBoolean => setLogout(newBoolean);
	return [logout, handleLogout];
}