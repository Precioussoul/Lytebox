import { AccountCircle, DarkMode, LightMode } from '@mui/icons-material'
import { MenuItem, Menu } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbarHome.scss'
import { HomePageNavBarProps } from '../../types'

function Navbar({ mode, setMode }: HomePageNavBarProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()
  return (
    <>
      <nav data-aos='fade-down' className='home-nav'>
        <a href='/' className='home-nav__logo'>
          <img src='/images/lytebox.png' alt='' />
        </a>

        <div className='iconbox'>
          {mode === 'dark' ? (
            <LightMode onClick={() => setMode('light')} />
          ) : (
            <DarkMode onClick={() => setMode('dark')} />
          )}
          <AccountCircle
            className='checkbtn'
            id='basic-menu'
            onClick={handleClick}
          />
        </div>
        <ul className={`home-nav__list ${mode}`}>
          <li>
            <a href='#about'>About</a>
          </li>
          <li>
            <a href='#features'>Features</a>
          </li>
          <li>
            <a href='#contact'>Contact</a>
          </li>
        </ul>
        <ul className={`home-nav__signin-out ${mode}`}>
          <li>
            {mode === 'dark' ? (
              <LightMode onClick={() => setMode('light')} />
            ) : (
              <DarkMode onClick={() => setMode('dark')} />
            )}
          </li>
          <li>
            <Link to={'/login'}>Sign in</Link>
          </li>
          <li style={{ color: '#fff' }}>
            <Link to={'/signup'} className='signup'>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate('/login')}>Sign in</MenuItem>
        <MenuItem onClick={() => navigate('/signup')}>Sign up</MenuItem>
      </Menu>
    </>
  )
}

export default Navbar

// #eff3f8
// #92a8d8
// #110D0E
// #
