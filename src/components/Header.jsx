/*eslint-disable react/prop-types*/
import {StyledHeader, LogoHeader} from '../styles/header/styles.js';
export default function Header ({children}){
	return (
		<StyledHeader>
			<LogoHeader>JS_LIFE</LogoHeader>
			<div>
				{children}
			</div>
		</StyledHeader>
	);
}