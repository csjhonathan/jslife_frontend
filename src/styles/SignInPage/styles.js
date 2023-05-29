import styled from 'styled-components';

export const FormContainer =styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  height: 30vh;
  width: 50vw;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width:768px) {
    height: 50%;
    width: 100%;
    padding: 12px;
  }
`;

export const Input = styled.input`
  height: 50px;
  width: 100%;
  font-family: 'Lexend Deca', sans-serif;
  padding-left: 12px;
`;

export const LoginInButton = styled.button`
  height: 50px;
  width: 80%;
  font-family: 'Lexend Deca', sans-serif;
  &:hover{
    cursor: pointer;
  }
`;

export const Logo = styled.div`
  background-color: black;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 30px ;
  font-weight: 700;
`;