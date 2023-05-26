/*eslint-disable react/prop-types*/
import {StyledSudentsList} from '../styles/studentsListPage/styles.js';
export default function StudentsList ({children}){
	return(
		<StyledSudentsList>{children}</StyledSudentsList>
	);
}