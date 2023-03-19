import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import './Login.scss'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../App'

const Login = () => {
  const [email, setEmail] = useState('')
  const { loginUser, signinWithGoogle } = useContext(AuthContext)
  const { mode } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [password, setPassword] = useState('')

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    loginUser(email, password, setError, setLoading, navigate)
  }

  let hideIcon = false
  if (email.includes('demo')) {
    hideIcon = true
  }

  useEffect(() => {
    setPassword('test123')
    setEmail('hbs@demo123.com')
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: 'auto',
        minHeight: '100vh',
        backgroundImage:
          mode === 'dark'
            ? 'url("/images/bubble-dark.webp")'
            : 'url("/images/bubble.webp")',
        color: mode === 'dark' ? 'text.color' : 'inherit',
      }}
    >
      <div className='hbs-logo'>
        <img src='/images/lytebox.png' alt='LyteBox' />
      </div>
      <form className={`form ${mode}`} onSubmit={handleSubmit}>
        {hideIcon && <h4 className='demo-header'>This is a demo account</h4>}
        <p className='form-header'>Enter your login details</p>
        <p className='error'>{error}</p>
        <div className='form-input'>
          <TextField
            sx={{ width: '100%' }}
            label={'Email'}
            type={'email'}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-input'>
          <FormControl sx={{ width: '100%' }} variant='outlined' required>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  {!hideIcon && (
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <div className={`forget-password ${mode}`}>
            <Link to='/forgot-password'>Forget Password ? `</Link>
          </div>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '50%' }}
            disabled={loading}
            disableElevation={loading}
          >
            Continue
          </Button>
        </Box>
      </form>

      <Button
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.3rem 3rem',
          marginTop: '1.2rem',
        }}
        variant='outlined'
        disabled={loading}
        disableElevation={loading}
        onClick={() => signinWithGoogle(setError, setLoading, navigate)}
      >
        <div className='google-signin-wrapper'>
          <img
            src='images/google.png'
            alt='google signin'
            className='google-signin'
          />
        </div>
        <p className='google-signin-text'>Sign in With Google</p>
      </Button>
      <div className={`account ${mode}`}>
        <p>Don't have an account ?</p>
        <Link to='/signup'>Sign up</Link>
      </div>
    </Box>
  )
}

export default Login
