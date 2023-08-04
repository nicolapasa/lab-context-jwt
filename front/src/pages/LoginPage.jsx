import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/SessionContext";
const LoginPage = () => {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // Add some states to control your inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault()
 
    const response=await fetch('http://localhost:5005/auth/login', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email, password }),
    })
    
    const data=await response.json()
 
    console.log("here is the Login response", data);
    storeToken(data.authToken); 
    authenticateUser();                     // <== ADD
    navigate('/');
  }

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Text align='center' size='xl' weight='bold'>
        Login
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleSubmit}
      >
        <TextInput label='Username' variant='filled' withAsterisk   onChange={(e)=>setEmail(e.target.value)}  />
        <PasswordInput label='Password' variant='filled' withAsterisk onChange={(e)=>setPassword(e.target.value)} />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Connect
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
