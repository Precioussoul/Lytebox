import { CloudUpload, CreateNewFolder } from '@mui/icons-material'
import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { FileAndFolderContext } from '../../contexts/FileAndFolderContext'
import { databaseRef, storage } from '../../firebase/firebase'
import useFolder, { ROOT_FOLDER } from '../../hooks/useFolder'
import FolderModal from '../FolderModal/FolderModal'
import { v4 as uuidV4 } from 'uuid'
import { ThemeContext } from '../../App'

import './AddButton.scss'
import { uploadingFileType } from '../../types'

export default function AddButton() {
  const [open, setOpen] = useState(false)
  const [openAction, setOpenAction] = useState(false)
  const { folder_Id } = useParams()
  const { currentUser } = useContext(AuthContext)
  const { mode } = useContext(ThemeContext)
  const { folder } = useFolder(folder_Id)
  const { setUpFile, setUploadingFiles, handleCloseShow, setError, fullSpace } =
    useContext(FileAndFolderContext)

  const currentFolder = folder

  const actionToggle = () => {
    setOpenAction(!openAction)
    var action = document.querySelector('.action')!
    action.classList.toggle('active')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMultipleFileUpload = (e: any) => {
    e.preventDefault()
    const files = e.target.files

    const fileArr = []
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i])
    }

    fileArr.forEach((file) => {
      setUpFile(file)
      const defaultFileValue = file.size / 1024 / 1024
      const fileSize = `${Math.round(defaultFileValue * 100) / 100}`

      if (currentFolder == null || file == null) return
      const id = uuidV4()
      handleCloseShow()

      setUploadingFiles((prevState: uploadingFileType[]) => [
        ...prevState,
        { id: id, name: file.name, progress: 0, error: false },
      ])

      const filePath =
        currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join('/')}/${file.name}`
          : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

      const fileRef = ref(storage, `files/${currentUser.uid}/${filePath}`)

      const uploadTask = uploadBytesResumable(fileRef, file)

      // const pauseUpload = () => {
      //   uploadTask.pause();
      // };
      // const resumeUpload = () => {
      //   uploadTask.resume();
      // };
      // const cancelUpload = () => {
      //   uploadTask.cancel();
      // };

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setUploadingFiles((prevState: any) => {
            return prevState.map((uploadFile: any) => {
              if (uploadFile.id === id) {
                return { ...uploadFile, progress: progress }
              }
              return uploadFile
            })
          })
        },
        () => {
          setUploadingFiles((prevState: uploadingFileType[]) => {
            return prevState.filter((uploadFile: any) => {
              if (uploadFile.id === id) {
                setError(true)
                return { ...uploadFile, error: true }
              }
              return uploadFile
            })
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              const q = query(
                databaseRef.filesRef,
                where('name', '==', file.name),
                where('folderId', '==', currentFolder.id),
                where('userId', '==', currentUser.uid)
              )

              getDocs(q).then((existingFiles) => {
                const existingFile: any = existingFiles.docs[0]
                if (existingFile) {
                  const existRef: any = ref(existingFile)
                  updateDoc(existRef, {
                    url: downloadUrl,
                  })
                } else {
                  addDoc(databaseRef.filesRef, {
                    name: file.name,
                    size: fileSize,
                    type: file.type,
                    url: downloadUrl,
                    isStarred: false,
                    isTrashed: false,
                    folderId: currentFolder.id,
                    folderName: currentFolder.name,
                    userId: currentUser.uid,
                    createdAt: databaseRef.timestamp,
                  })
                }
              })
            })
            .then(() => {
              setUploadingFiles((prevState: uploadingFileType[]) => {
                return prevState.filter((uploadFile: any) => {
                  return uploadFile.id !== id
                })
              })
              setUpFile('')
              setUploadingFiles([])
            })
        }
      )
    })
  }

  const { pathname } = useLocation()
  const pathgens = [
    'acc-settings',
    'gen-settings',
    'trash',
    'favorites',
    'recents',
  ]

  var prevScrollpos = window.pageYOffset
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('act-btn')!.style.bottom = '30px'
    } else {
      document.getElementById('act-btn')!.style.bottom = '-300px'
    }
    prevScrollpos = currentScrollPos
  }

  return (
    <div
      className={
        pathgens.filter((path) => pathname === path)[0] ? 'hide' : 'show'
      }
    >
      <div id='act-btn' className={`action ${mode}`} onClick={actionToggle}>
        <span className={openAction ? 'rotate' : ''}>+</span>

        {fullSpace ? (
          <ul>
            <li>
              <div>
                <p className='error'>
                  Sorry, your space is full, please upgrade or delete files
                </p>
              </div>
            </li>
          </ul>
        ) : (
          <ul className={`${mode}`}>
            <li id='folder' onClick={() => setOpen(true)}>
              <CreateNewFolder className='icon' fontSize='large' />
              <p>Create new folder</p>
            </li>
            <li>
              <label htmlFor='fileup' className='fileup-label'>
                <CloudUpload className='icon' fontSize='large' />
                <p>Upload File</p>
              </label>
              <input
                type='file'
                id='fileup'
                className='file-up'
                multiple
                onChange={handleMultipleFileUpload}
              />
            </li>
          </ul>
        )}
      </div>
      <FolderModal open={open} handleclose={handleClose} />
    </div>
  )
}
