import { ChevronLeft } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import File from '../../components/File/File'
import { FileAndFolderContext } from '../../contexts/FileAndFolderContext'
import { color } from '../../theme'

export default function DocsFilter() {
  const navigate = useNavigate()
  const { documents } = useContext(FileAndFolderContext)

  return (
    <div>
      <div className='acc-header'>
        <Typography
          paragraph
          color={color.textColor}
          sx={{
            alignSelf: 'flex-start',
            marginBottom: '20px',
            fontSize: 20,
          }}
        >
          <p>Documents -</p>
        </Typography>
        <Button
          variant='outlined'
          onClick={() => navigate(-1)}
          sx={{
            // bgcolor:
            padding: '5px',
            borderRadius: 5,
            fontSize: 12,
            alignSelf: 'flex-start',
          }}
        >
          <ChevronLeft />
        </Button>{' '}
      </div>
      <Divider />
      <div className='file-view'>
        {documents.map((file: any) => (
          <File key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}
