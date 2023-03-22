import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import File from '../../components/File/File'
import Filter from '../../components/Filter/Filter'
import Folder from '../../components/Folders/Folder'
import './Dashboard.scss'
import useFolder from '../../hooks/useFolder'
import { FileAndFolderContext } from '../../contexts/FileAndFolderContext'
import FilterMobile from '../../components/FilterMobile/FilterMobile'
import {
  audioTotal,
  availableSpace,
  docTotal,
  imageTotal,
  otherFileTotal,
  vidTotal,
} from '../../components/StorageProgress/Storage'
import { AuthContext } from '../../contexts/AuthContext'
import { ThemeContext } from '../../App'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { DarkMode, LightMode } from '@mui/icons-material'
import { FileType, FolderType } from '../../types'

export default function Dashboard() {
  const { folder_Id } = useParams()
  const { childFolders, childFiles } = useFolder(folder_Id)
  const {
    documents,
    audios,
    videos,
    images,
    otherFiles,
    allFiles,
    totalProgress,
    totalSize,
    loading,
  } = useContext(FileAndFolderContext)
  const { currentUser } = useContext(AuthContext)
  const { mode, setMode } = useContext(ThemeContext)

  return (
    <>
      {loading ? (
        <div className='Dashboard'>
          <div className='filter-view'>
            <Filter
              imgUrl={'/images/documents.png'}
              count={documents.length}
              type={'Documents'}
              link={'/documents'}
            />
            <Filter
              imgUrl={'/images/image.png'}
              count={images.length}
              type={'Images'}
              link={'images'}
            />
            <Filter
              imgUrl={'/images/video-folder.png'}
              count={videos.length}
              type={'videos'}
              link={'videos'}
            />
            <Filter
              imgUrl={'/images/mp3.png'}
              count={audios.length}
              type='audio'
              link={'audios'}
            />
            <Filter
              imgUrl={'/images/otherFile.png'}
              count={otherFiles.length}
              type={'others'}
              link={'others'}
            />
          </div>
          <div className='filterMobile'>
            <div className='m-greeting '>
              <div className='m-header'>
                <span className={`m-greeting-time ${mode}`}>Welcome Back</span>
                <span className='m-icon'>
                  {mode === 'dark' ? (
                    <LightMode onClick={() => setMode('light')} />
                  ) : (
                    <DarkMode onClick={() => setMode('dark')} />
                  )}
                </span>
              </div>

              <p className={`m-greeting-name ${mode}`}>
                {currentUser.displayName
                  ? currentUser.displayName
                  : currentUser.email}
              </p>
            </div>
            <div className={`m-storage-dashboard ${mode}`}>
              <div className='m-storage-icon'>
                <img src='images/server.png' alt='storage' />
              </div>
              <div className='m-storage-details'>
                <div className={`m-storage-space ${mode}`}>
                  <p className='space-name'>Available Space</p>
                  <span className='space-count'>{allFiles.length} files</span>
                </div>
                <p
                  className={`space-metric ${mode}`}
                >{`${totalSize}MB of ${availableSpace}MB used`}</p>
                <div className='space-progress'>
                  <div
                    style={{
                      width: `${totalProgress > 0 ? totalProgress : 0}%`,
                    }}
                    className='space-progress-bar'
                  ></div>
                </div>
              </div>
            </div>
            <div className='categories'>
              <FilterMobile
                count={documents.length}
                type={'Documents'}
                imgUrl={'images/documents.png'}
                totalSize={Math.round(docTotal * 100) / 100}
                link={'documents'}
              />
              <FilterMobile
                count={images.length}
                type={'images'}
                imgUrl={'images/image.png'}
                totalSize={Math.round(imageTotal * 100) / 100}
                link={'images'}
              />
              <FilterMobile
                count={videos.length}
                type={'videos'}
                imgUrl={'images/video-folder.png'}
                totalSize={Math.round(vidTotal * 100) / 100}
                link={'videos'}
              />
              <FilterMobile
                count={audios.length}
                type={'audio'}
                imgUrl={'images/mp3.png'}
                totalSize={Math.round(audioTotal * 100) / 100}
                link={'audios'}
              />
              <FilterMobile
                count={otherFiles.length}
                type={'others'}
                imgUrl={'images/otherFile.png'}
                totalSize={Math.round(otherFileTotal * 100) / 100}
                link={'others'}
              />
            </div>
          </div>
          {childFiles?.length <= 0 && childFolders?.length <= 0 ? (
            <div className='welcome-empty'>
              <h2>Welcome to Lytebox</h2>
              <img src='/images/handshake.png' alt='' />
              <p>
                There is currently no file or folder in your secure box at the
                moment!!
              </p>
            </div>
          ) : (
            <div className='file-folder-wrapper'>
              <div className='folders'>
                {childFolders.length > 0 && (
                  <div className='folders-info'>
                    <h4>Folders</h4>
                  </div>
                )}
                {childFolders.length > 0 && (
                  <div className='folders-view'>
                    {childFolders.map((childFolder: FolderType) => (
                      <Folder key={childFolder.id} folder={childFolder} />
                    ))}
                  </div>
                )}
              </div>
              {childFiles.length > 0 && (
                <div className='file-info'>
                  <h4>Files</h4>
                </div>
              )}
              {childFiles.length > 0 && (
                <div className='file-view'>
                  {childFiles.map((childFile: FileType) => (
                    <File key={childFile.id} file={childFile} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}
