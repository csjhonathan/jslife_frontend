import styled from 'styled-components';

export const StyledHeader = styled.div`
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  padding: 15px;
  background-color: lightblue;
  border-bottom: solid 1px;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 768px){
      width: 100%;
    }
    button{
    margin-left: 15px;
    font-family: 'Lexend Deca', sans-serif;
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: underline;
    font-weight: 700;
    &:hover{
      color: white;
    }
    }
  }
`;

export const LogoHeader = styled.h1`
  font-weight: 700;
  font-size: 30px;
  @media(max-width: 768px){
      display: none;
    }
`;