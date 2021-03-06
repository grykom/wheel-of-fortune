import React, { useState, useEffect, useRef } from 'react';
import { Letter, Container, Footer, Letters, InputText, Form, Button } from './Wheel.style';
import PropTypes from "prop-types";

function SingleChar({ letter, finished }){
    return (<>
            { letter.name === "-" ? 
                <br clear="all" /> : 
                <Letter hidden={letter.name === " "} finished={ finished }>{ letter.visibility ? letter.name : ' ' }</Letter> 
            }
    </>)
}

function Wheel() {
    const letterRef = useRef(null);
    const passwordRef = useRef(null);
    // inputs
    const [ inputLetter, setInputLetter ] = useState(""); 
    const [ inputPassword, setInputPassword ] = useState("");
    // passwords 
    const [ passwordLetterArray, setPasswordLetterArray ] = useState([]);    
    const [ password, setPassword ] = useState("");
    // congratulations! :)
    const [ finished, setFinished ] = useState(false);

    useEffect(() => {
        for (const letter in password.split('')){
            setPasswordLetterArray(prev => [...prev, 
                {
                    "name": password[letter],
                    "visibility": false
                }]);
        }        
        letterRef.current ? 
            letterRef.current.focus() :
            passwordRef.current && passwordRef.current.focus();      
    }, [password])

    const handleCheckLetter = (e) => {        
        e.preventDefault();
        const updatedArray = passwordLetterArray.map(letter => {
            if(letter.name === inputLetter){
                return { ...letter, visibility: true }
            }
            return letter
        });
        setPasswordLetterArray(updatedArray);
        setInputLetter("");
        if(updatedArray.filter(char => char.name !== " " && char.name !== "-" && !char.visibility).length === 0){
            setFinished(true);
            passwordRef.current.focus();
        }
    }
    const handleSetPassword = (e) => {
        e.preventDefault();
        if(inputPassword !== password){
            setPasswordLetterArray([]);
            setPassword(inputPassword);
            setInputPassword("");
            setFinished(false);   
        }
    }
    const handleShow = () => {
        setPasswordLetterArray([]);
        for (const letter in password){
            setPasswordLetterArray(prev => [...prev, 
                {
                    "name": password[letter],
                    "visibility": true
                }]);
        }
        setFinished(true);
        passwordRef.current.focus();
    }

    return (
        <Container>            
            <Letters>
                { passwordLetterArray.map((char, idx) => <SingleChar key={idx} letter={char} finished={finished} />) }
            </Letters>
            <Footer>
                <Form onSubmit={ handleSetPassword }>
                    <InputText ref={ passwordRef }
                        type="password"
                        value={ inputPassword }
                        onChange={(e) => setInputPassword(e.target.value.toUpperCase())}
                        placeholder="Ustaw nowe has??o" />
                </Form>                               
                {password && !finished && <>
                <Form onSubmit={ handleCheckLetter }>
                    <InputText ref={ letterRef } bigger
                        value={ inputLetter }
                        onChange={(e) => setInputLetter(e.target.value.toUpperCase())}
                        maxLength="1" />
                </Form>
                <Button onClick={handleShow}>Ods??o?? has??o</Button>     
                </> }           
            </Footer>
        </Container>
    )
}

SingleChar.propTypes = {
    letter: PropTypes.shape({
        name: PropTypes.string,
        visibility: PropTypes.bool
    }),
    finished: PropTypes.bool
}

export default Wheel
