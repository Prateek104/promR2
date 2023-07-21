import {React, useState, useEffect} from "react";
import styled from "styled-components";
import Axios from 'axios';
import BasicModal from "./Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    gap: 20px;
`

const Section = styled.div`
  height: 35vh;
  width: 30vw;
  background-color:lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    gap: 20px;
  border: black 3px;
  border-radius:25px;
  @media only screen and (max-width: 768px) {
    width:60vw;
  }
`
const Input = styled.input`
display: flex
align-items: center;
  justify-content: center;
  width: 50vh;
  height:5vh;
  border-radius:8px;
`
const Title = styled.h1`
  font-size: 34px;
  color:black;
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: white;
  color: black;
  font-weight: 500;
  width: 120px;
  padding: 10px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  :hover{
    background-color: red;
  color: white;
  }
`;

const Button2 = styled.button`
  background-color: white;
  color: black;
  font-weight: 500;
  width: 120px;
  padding: 10px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  :hover{
    background-color: black;
  color: white;
  }
`;

const Login = () => {
    const[userName, setUserName] = useState('')
    const[userPassword, setUserPassword] = useState('')
    const[loginAuth, setLoginAuth] = useState('')

    const submitCred = () => {
        Axios.post('http://localhost:3001/api/insert', {userName:userName, userPassword:userPassword}).then (()=>{
            alert("Successful insert?")
        })
    }

    const regUser = () => {
        Axios.post('http://localhost:3001/register', {userName:userName, userPassword:userPassword}).then ((response)=>{
            console.log(response)
        })
    }

    const checkUser = () => {
        Axios.post('http://localhost:3001/check', {userName:userName, userPassword:userPassword},{headers:{'Access-Control-Allow-Origin': '*'}}).then ((response)=>{
        if (response.data.message !== "Wrong Credentials"){
            confirm(`Welcome ${response.data[0].name}! \nYou are a registered user!`)
        }     
        else{ alert(response.data.message)}
        })
    }

    return(
        <Container>
        <Section>
            <Title>Login</Title>
            <Input placeholder=" Login ID" onChange={(e)=>{
                setUserName(e.target.value)
            }}/>
            <Input placeholder=" Password" onChange={(e)=>{
                setUserPassword(e.target.value)
            }}/>
             <Button onClick={checkUser}> Submit </Button>
        </Section>
        <BasicModal />
        </Container>
       
    )
}

export default Login