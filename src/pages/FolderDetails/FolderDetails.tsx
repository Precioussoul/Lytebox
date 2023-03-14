import React from 'react';
import { useParams } from 'react-router-dom';
import File from '../../components/File/File';
import Folder from '../../components/Folders/Folder';
import GoBack from '../../components/GoBack/GoBack';
import useFolder from '../../hooks/useFolder';

export default function FolderDetails() {
  const { folder_Id } = useParams();
  const { childFolders, folder, childFiles } = useFolder(folder_Id);
  return (
    <div className='folderDetails'>
      <GoBack currentFolder={folder} />
      {childFolders.length > 0 && (
        <div className='folders-info'>
          <h4>Folders</h4>
        </div>
      )}
      <div className='folders'>
        {childFolders.length > 0 && (
          <div className='folders-view folderDetails'>
            {childFolders.map((childFolder: any) => (
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
          {childFiles.map((childFile: any) => (
            <File key={childFile.id} file={childFile} />
          ))}
        </div>
      )}
    </div>
  );
}
