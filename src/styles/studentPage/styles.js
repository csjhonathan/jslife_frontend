import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-weight: 700;
  font-size: 25px;
  @media(max-width: 768px){
    
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const StudentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 90vh;
  width: 60vw;
  @media(max-width: 768px){
    height: 100%;
    width: 100vw;
  }
  font-family: 'Lexend Deca', sans-serif;
`;

export const StudentDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80%;
  width: 60%;
  align-items: center;
  border: solid 1px;
  @media(max-width: 768px){
    padding: 12px;
    height:100%;
    width: 100%;
    border: none;
  }
`;

export const StudentData = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-evenly;
  width: 70%;
  @media(max-width: 768px){
    height: 30%;
    width: 100%;
  }
`;

export const StudentLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 130px;
  width: 130px;
  border-radius: 50%;
  color: white;
  font-size: 90px;
  background-color: black;
`;

export const ClassesList = styled.ul`
  height: 40%;
  width: 70%;
  @media(max-width: 768px){
    height: 30%;
    width: 100%;
  }
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`;

export const ClassItem = styled.li`
  background-color: ${({isCurrent}) => isCurrent && 'lightgray'};
  margin-bottom: 10px;
  border: solid 1px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
`;

export const ClassLabel = styled.p`
  width: 70%;
@media(max-width: 768px){
  align-self: flex-start;
  }
`;
