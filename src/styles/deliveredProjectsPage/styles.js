import styled from 'styled-components';
import {AiFillEdit} from 'react-icons/ai';
import grades from '../../constants/grades.js';

export const DeliveredPageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
`;

export const DeliveredListContainer = styled.div`
    width: 100vw;
    height: 100%;
    padding-right: 24vw;
    padding-left: 36vw;
    display: flex;
    justify-content: center;
    align-items:center;
    font-family: 'Lexend Deca', sans-serif;
    align-self: right;
`;

export const PageTilte = styled.h1`
  font-family: 'Lexend Deca', sans-serif; 
  font-weight: 700;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media(max-width: 768px){
    margin-left: 20px;
  }
`;

export const FilterMenu = styled.ul`
  position: fixed;
  left: 0;
  top:60px;
  width: 12vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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
  @media(max-width: 768px){
    height: 100%;
    width: 30vw;
  }
  border-right: solid 1px;
`;

export const ClassesOptionsContainer = styled.div`
  border-top: 1px solid;
  height: 33%;
`;

export const ProjectsOptionsContainer = styled.div`
  border-top: 1px solid;
  height: 33%;
`;

export const ClassesList = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  scroll-snap-type: y mandatory;
`;

export const ProjectsList = styled.ul`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  &::-webkit-scrollbar{
    display: none;
  }
`;

export const SeeAllButton = styled.button`
  font-family: 'Lexend Deca', sans-serif; 
  cursor: pointer;
      &:hover{
        color: lightgray;
        text-decoration: underline;
      }
  background: transparent;
  border: none;
`;

export const ListContainer = styled.div`
  height: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media(max-width: 768px){
    margin-left: 17vw;
  }
`;

export const DeliveredList = styled.ul`
  height: 100%;
  width: 88vw;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction:column;
  @media(max-width: 768px){
    width:70vw;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`;

export const DeliveredListItem = styled.li`
  width: 100%;
  min-height: 60px;
  display: flex;
  padding: 15px;
  align-items: center;
  border: solid 1px;
  margin-bottom: 18px;
  justify-content: space-between;
`;

export const EditIcon = styled(AiFillEdit)`
  margin-left: 10px;
  height: 20px;
  width: 20px;
`;

export const GradeButton = styled.button`
  background: none;
  border: none;
  color: ${({grade})=> grades[grade]};
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  &:hover{
    color: ${({disabled}) => (disabled ? '' : 'lightgray')};
  }
  pointer-events: ${({disabled}) => (disabled ? 'none' : 'auto')};
  font-weight: 700;
`;

