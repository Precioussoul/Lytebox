import { Box, Button, Divider, Modal, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../App'
import { AuthContext } from '../../contexts/AuthContext'
import { color } from '../../theme'
import './deleteAcc.scss'

const DeleteAcc = () => {
  const { currentUser, deleteUserAccount } = useContext(AuthContext)
  const { mode } = useContext(ThemeContext)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleDelete = (e: any) => {
    e.preventDefault()
    try {
      deleteUserAccount(currentUser, navigate, setError)
    } catch (err) {
      console.log(err)
    }
  }

  const handleclose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <div className={`user-acc ${mode}`}>
      <Typography
        color={color.textColor}
        sx={{
          alignSelf: 'flex-start',
          marginBottom: '20px',
          fontSize: 16,
        }}
      >
        <p>Danger Zone - </p>
        <br />
      </Typography>
      <Divider sx={{ border: '1px solid red' }} />
      <div className='delete-acc'>
        <p>Delete Account: </p>

        <Button
          onClick={handleOpen}
          sx={{
            bgcolor: 'red',
            fontSize: { xs: '12px', sm: 'inherit' },
          }}
          variant='contained'
        >
          Delete Account
        </Button>
      </div>
      <div className='modal-delete'>
        <Modal open={open} onClose={handleclose}>
          <Box
            sx={{
              width: { xs: '90vw', sm: 520 },
              height: { xs: '50vh', sm: 450 },
              backgroundColor: 'background.default',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              padding: { xs: 1, sm: 1.5 },
              borderRadius: 5,
              margin: 'auto',
            }}
          >
            <h2 className='error'>{error}</h2>
            <div className='user-img-wrapper'>
              <img src='/images/user-trashed.png' alt='user trashed' />
            </div>
            <div className='modal-acc'>
              <Typography
                variant='h3'
                sx={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  flexWrap: 'wrap',
                }}
              >
                Are you sure you want to delete this account?
              </Typography>
              <Typography
                paragraph
                sx={{
                  fontSize: { xs: '12px', sm: '15px' },
                  lineHeight: 1.5,
                  marginTop: 1,
                }}
              >
                Your account will be deleted immediately and permanently. Once
                deleted, account cannot be restored.
              </Typography>
            </div>

            <div className='form-buttons'>
              <Button type='reset' variant='outlined' onClick={handleclose}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant='contained'
                sx={{
                  bgcolor: 'red',
                }}
              >
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default DeleteAcc
