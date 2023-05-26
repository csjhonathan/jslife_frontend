const nameFormater = name => {
  
	const nomeSobrenome = name.split(' ');
	let resultado = '';
	for (let i = 0; i < nomeSobrenome.length; i++) {
		const palavra = nomeSobrenome[i];
		if (!/^(de|do|dos|das|da)$/i.test(palavra)) {
			resultado += palavra[0];
		}
	}
	if(resultado.length > 2){
		return resultado.substr(0, 2);
	}
  
	return resultado;
};

export default nameFormater;