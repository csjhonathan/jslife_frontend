import styled from 'styled-components';

export const FormContainer = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  font-family: 'Lexend Deca', sans-serif;
  @media(max-width: 768px){ 
    height: 100%;
    width: 100%;
  }
`;

export const FormTitle = styled.h1`
  font-weight: 700;
  font-size: 30px;
  @media(max-width: 768px){ 
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const EditStudentForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 70vw;
  justify-content: space-evenly;
  padding: 20px;
  align-items: center;
  border: solid 1px;
  border-radius: 5px;
  @media(max-width: 768px){ 
    height: 100%;
    width: 100%;
    border: none;
  }
`;


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  input{
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    margin-top: 5px;
    padding-left: 5px;
    &::placeholder{
      font-family: 'Lexend Deca', sans-serif;
      padding-left: 5px;
    }
  }
  select{
    width: 100%;
    height: 40px;
    border-radius: 10px;
    margin-top: 5px;
    font-family: 'Lexend Deca', sans-serif;
    option{
      font-family: 'Lexend Deca', sans-serif;
    }
  }
`;

export const EditButton = styled.button`
  height: 50px;
  width: 80%;
  cursor: pointer;
  font-family: 'Lexend Deca', sans-serif;
`;
