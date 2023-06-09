import { Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import { AuthContext } from '../../contexts/AuthContext';
import { color } from '../../theme';
import './verify.scss';

const VerifyEmail = () => {
  const { currentUser, verifyEmailAddress } = useContext(AuthContext);
  const { mode } = useContext(ThemeContext);
  const [msg, setMsg] = useState('');

  const handleVerify = (e: any) => {
    e.preventDefault();
    verifyEmailAddress(currentUser, setMsg);
  };
  return (
    <div className='main-div'>
      <Typography
        color={color.textColor}
        sx={{
          alignSelf: 'flex-start',
          marginBottom: '20px',
          fontSize: 16,
        }}
      >
        <p>Email verification status -</p>
        <br />
      </Typography>
      <form className={`user-acc ${mode}`} onSubmit={handleVerify}>
        <p> {currentUser.displayName}</p>
        <p className='user-acc__pro-title'>
          {currentUser.emailVerified
            ? 'Congratulation, you have been verified'
            : 'Please verify your email address '}
        </p>
        {/* <p className="error">{error}</p> */}
        {/* <p className="success">{message}</p> */}
        {!currentUser.emailVerified && (
          <div className='please-verify'>
            <p className='success'>{msg}</p>
            <Button variant='contained' onClick={handleVerify}>
              click to verify email
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default VerifyEmail;
