import {React, useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'cyan',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  alignItems:'center',
  justifyContent:'center',
  borderRadius: 8
};

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
  display:flex;
  align-items:center;
  }
`;
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

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[userName, setUserName] = useState('')
  const[userPassword, setUserPassword] = useState('')

  const regUser = () => {
    Axios.post('http://localhost:3001/register', {userName:userName, userPassword:userPassword}).then ((response)=>{
        console.log(response)
    })
}

  return (
    <div>
      <Button2 onClick={handleOpen}>Not an user?</Button2>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register here
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Input placeholder='Username' onChange={(e)=>{
                setUserName(e.target.value)
            }}/>
          <br />
          <Input placeholder='Password'onChange={(e)=>{
                setUserPassword(e.target.value)
            }}/>
          <Button2 onClick={regUser}>Register</Button2>
        </Box>
      </Modal>
    </div>
  );
}