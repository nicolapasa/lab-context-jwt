import { AppShell, Box, Button, Header } from '@mantine/core'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import IsPrivate from './components/IsPrivate'
import { ProfilePage } from './pages/ProfilePage'
import { AuthContext } from "./contexts/SessionContext";
import { useContext, useEffect } from 'react'


function App() {
  const { isLoggedIn, isLoading, logOutUser } = useContext(AuthContext);



  return (
    <AppShell
      padding='md'
      header={
        <Header height={60} p='xs' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} to='/' variant='subtle' color='cyan'>
            Home
          </Button>
          { isLoggedIn  &&
          <>
          <Button component={Link} to='/profile' variant='subtle' color='cyan'>
         Profile
          </Button>
              <Button onClick={logOutUser}  variant='subtle' color='cyan'>
             Logout
               </Button>
               </>
      }
                { !isLoggedIn  &&
          <Box>
            <Button component={Link} to='/signup' variant='subtle' color='cyan'>
              Signup
            </Button>
            <Button component={Link} to='/login' variant='subtle' color='cyan'>
              Login
            </Button>
          
          </Box>
      }
        </Header>
      }
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Add some new route(s) on what you want to work, don't forget to make a PrivateRoute component */}
        <Route path='/profile' element={  
        <IsPrivate>
          <ProfilePage />
        </IsPrivate>
        } />
      </Routes>
    </AppShell>
  )
}

export default App
