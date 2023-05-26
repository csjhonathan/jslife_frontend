import styled from 'styled-components';

export const DeliverProjectContainer = styled.div`
  height: 100%;
  width: 100%;
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const DeliverPojectPageTilte = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;

export const DeliverForm = styled.form`
  height: 60vh;
  display: flex;
  flex-direction: column;
  width: 80vw;
  justify-content: space-between;
  padding: 30px;
  border: solid 1px;
  @media(max-width: 768px){
    height: 70vh;
    width: 100vw;
    padding: 12px;
    border: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DeliverSelect = styled.select`
  height: 40px;
  option{
    font-family: 'Lexend Deca', sans-serif;
  }
`;

export const DeliverLabel = styled.label`
  margin-bottom: 10px;
`;

export const RepositoryInput = styled.input`
  height: 40px;
  font-family: 'Lexend Deca', sans-serif;
  padding-left: 12px;
  &::placeholder{
    font-family: 'Lexend Deca', sans-serif;
  }
`;

export const DeliverButton = styled.button`
  height: 60px;
  width: 70%;
  align-self: center;
  cursor: pointer;
`;