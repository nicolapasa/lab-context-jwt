import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import { useState } from 'react'

const SignupPage = () => {
  // Add some states to control your inputs
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
  const handleSubmit =async (event) => {
    event.preventDefault()
    // Send your signup information to your backend
    const response =  await fetch('http://localhost:5005/auth/signup', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email, password }),

     })
     console.log(response)
     if (response.status === 200) {
      const parsed = await response.json()
      console.log(parsed)
      // Logic to navigate to the newly created apartment
      // navigate(`/apartments/${parsed._id}`)
      // Logic to empty your state to have a clean form
      setEmail('')
      setPassword('')
    }


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
        Signup
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleSubmit}
      >
        <TextInput label='Username' variant='filled' withAsterisk  onChange={(e)=>setEmail(e.target.value)}  />
        <PasswordInput label='Password' variant='filled' withAsterisk  onChange={(e)=>setPassword(e.target.value)} />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}

export default SignupPage
