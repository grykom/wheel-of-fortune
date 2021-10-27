import styled, { css } from 'styled-components';

export const Container = styled.div` 
    box-sizing: border-box;
    height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Letters = styled.div`
    height: auto;
    margin: auto 0;
    text-align: center;
`

export const Letter = styled.button`
    width: 100px;
    height: 100px;
    display: inline;
    margin: 5px;
    font-size: 4.5rem;
    white-space: pre-wrap;    

    ${props => props.hidden && css`visibility: hidden;`}    
    ${props => props.finished && css`        
        background-color: lightgreen;
        transform: scale(1.05) rotate(1turn);
        transition: transform 1s;
    `}

`
export const Footer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`

export const Form = styled.form``

export const InputText = styled.input`
    width: 200px;
    height: 30px;
    border: 1px solid gray;

    ${props => props.bigger && css`
        text-align: center;
        font-size: 3rem;
        width: 80px;
        height: 80px;
        display: block;
    `}
`

export const Button = styled.button`
    width: 200px;
    height: 30px;
    border: 1px solid gray;
`