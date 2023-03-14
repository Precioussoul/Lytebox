import { ActionProps } from '../types';
import ACTIONS from './action';

// actions

function rootReducer(state: any, { type, payload }: ActionProps) {
  //
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    case ACTIONS.UPDATE_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };

    default:
      return state;
  }
}

export default rootReducer;
