import { onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { databaseRef } from '../firebase/firebase'
import { AuthContext } from './AuthContext'
import { propschildren } from '../types'

export const FileAndFolderContext = React.createContext<any>({})

function FileAndFolderProvider({ children }: propschildren) {
  const [folderName, setFolderName] = useState('')
  const [uploadingFiles, setUploadingFiles] = useState([])
  const [show, setShow] = useState(true)
  const [upfile, setUpFile] = useState('')
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [allFiles, setAllFiles] = useState([])
  const [allFolders, setAllFolders] = useState([])
  const { currentUser } = useContext(AuthContext)
  const [totalProgress, setTotalProgress] = useState(0)
  const [totalSize, setTotalSize] = useState(0)
  const [loading, setLoading] = useState(false)

  const document1 = allFiles.filter((file: any) =>
    file.type.toLowerCase().includes('application/vnd')
  )
  const document2 = allFiles.filter((file: any) =>
    file.type.toLowerCase().includes('pdf')
  )
  const document3 = allFiles.filter((file: any) =>
    file.type.toLowerCase().includes('application/msword')
  )

  const documents = [...document1, ...document2, ...document3]
  const audios = allFiles.filter((file: any) =>
    file.type.toLowerCase().includes('audio/')
  )
  const images = allFiles.filter((file: any) =>
    file.type.toLowerCase().includes('image/')
  )
  const videos = allFiles.filter((file: any) =>
    file.type.toLowerCase().includes('video/')
  )

  const fileFavorites = allFiles.filter((file: any) => file.isStarred === true)
  const folderFavorites = allFolders.filter(
    (folder: any) => folder.isStarred === true
  )

  useEffect(() => {
    if (currentUser) {
      const q = query(
        databaseRef.filesRef,
        where('userId', '==', currentUser.uid),
        orderBy('createdAt')
      )

      const q2 = query(
        databaseRef.foldersRef,
        where('userId', '==', currentUser.uid),
        orderBy('createdAt')
      )
      onSnapshot(q2, (querySnapshot) => {
        const folderdata: any = querySnapshot.docs.map((doc) =>
          databaseRef.formatDoc(doc)
        )
        setAllFolders(folderdata)
      })

      onSnapshot(q, (querySnapshot) => {
        const filedata: any = querySnapshot.docs.map((doc) =>
          databaseRef.formatDoc(doc)
        )
        setAllFiles(filedata)
      })
    }
  }, [currentUser])

  useEffect(() => {
    localStorage.removeItem('favorites')
  }, [])

  const otherFiles = allFiles.filter(
    (file: any) =>
      !file.type.toLowerCase().includes('image') &&
      !file.type.toLowerCase().includes('audio') &&
      !file.type.toLowerCase().includes('video') &&
      !file.type.toLowerCase().includes('application/vnd') &&
      !file.type.toLowerCase().includes('application/x-ms') &&
      file.type.toLowerCase().includes('x-zip')
  )
  const searchFiles = allFiles.filter(
    (file: any) =>
      file.type.toLowerCase().includes(searchQuery) ||
      file.name.toLowerCase().includes(searchQuery)
  )
  const searchFolders = allFolders.filter((folder: any) =>
    folder.name.toLowerCase().includes(searchQuery)
  )

  const handleCloseShow = () => {
    setShow(true)
  }

  const values: any = {
    folderName,
    setFolderName,
    uploadingFiles,
    setUploadingFiles,
    setUpFile,
    upfile,
    show,
    setShow,
    handleCloseShow,
    error,
    setError,
    documents,
    images,
    audios,
    videos,
    otherFiles,
    searchQuery,
    setSearchQuery,
    searchFiles,
    searchFolders,
    allFiles,
    allFolders,
    totalProgress,
    setTotalProgress,
    totalSize,
    setTotalSize,
    setLoading,
    loading,
    fileFavorites,
    folderFavorites,
  }

  return (
    <FileAndFolderContext.Provider value={values}>
      {children}
    </FileAndFolderContext.Provider>
  )
}

export default FileAndFolderProvider
