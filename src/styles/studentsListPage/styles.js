import styled from 'styled-components';

export const StudentsListContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
`;
export const ClassTitle = styled.h1`
  font-family: 'Lexend Deca', sans-serif; 
  font-weight: 700;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
`;


export const SelectClassesMenu = styled.ul`
  position: fixed;
  left: 0;
  top:60px;
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  li{
    margin-top: 20px;
    button{
      font-family: 'Lexend Deca', sans-serif; 
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:hover{
        color: lightgray;
        text-decoration: underline;
      }
    }
  }
  border-right: solid 1px;
`;

export const StyledSudentsList = styled.ul`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction:column;
`;

export const StudentsListItem = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  padding-left: 15px;
  align-items: center;
  border: solid 1px;
  margin-top: 18px;
`;

export const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`;

