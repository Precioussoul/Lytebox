import { User } from 'firebase/auth'

export type propschildren = {
  children: React.ReactNode
}

export type colors = {
  primaryColor: string
  primaryColor2: string
  primaryColor3: string
  secondaryColor2: string
  secondaryColor: string
  whitebgColor: string
  whiteBgColor2: string
  textColor: string
  grayColor: string
  grayColor2: string
}

export type ThemeContextType = {
  mode: string
  setMode: (mode: string) => void
}
export type HomePageNavBarProps = {
  mode: string
  setMode: (mode: string) => void
}

export type AuthGlobalType = {
  currentUser: User
  signupUser: (email: string, password: string) => any
  loginUser: (
    email: string,
    password: string,
    setError: any,
    setLoading: any,
    navigate: any
  ) => any
  logout: () => any
  updateUserProfile: (
    name: string,
    photo: string,
    setError: (error: string) => void,
    navigate: (nav: string) => any
  ) => any
  resetPassword: (email: string) => any
  verifyEmailAddress: (user: User, message: (msg: string) => void) => any
  updateEmailAddress: (email: string) => any
  updateCurrentPassword: (password: string) => any
  deleteUserAccount: (currentUser: User) => any
  signinWithGoogle: (
    setError: (error: string) => void,
    navigate: any,
    setLoading: any
  ) => any
}

export type handleFileUploadProps = {
  handleMultipleFileUpload?: (e: any) => any
}

export type fileSummaryProps = {
  image: string
  type: string
  length: number
  totalSize: number
}
export type FileType = {
  id: string
  userId: string
  createdAt: any
  folderId: string | null
  folderName: string | null
  isTrashed: boolean
  isStarred: boolean
  name: string
  size: string
  type: string
  url: string
}
export type FolderType = {
  id: string | undefined
  userId?: string
  createdAt?: any
  parentId?: string | null
  isTrashed?: boolean
  isStarred?: boolean
  name: string
  path:
    | []
    | {
        id: string | undefined
        name: string
      }[]
}
export type FileProps = {
  file: FileType
  fromTrash?: boolean
}

export type ActionProps = {
  type: string
  payload: any
}

export type PreviewModalProps = {
  open: boolean
  handleclose: () => void
  viewFile: any
  download: () => void
}

export type modeProps = {
  mode: string
}
export type modePropsTwo = {
  mode: string
  setMode: (mode: string) => void
}

export type fileListProps = {
  file: FileType
}

export type filterProps = {
  imgUrl: string
  count: number
  link: string
  type: string
}

export type filterMobileProps = {
  count: number
  type: string
  imgUrl: string
  totalSize: number
  link: string
}

export type FolderModalProps = {
  open: boolean
  handleclose: () => void
}

export type FolderProps = {
  currentFolder?: any
}
export type FeatureProps = {
  image: string
  name: string
  description: string
}

export type InitialStateProps = {
  folderId: string | null
  folder: FolderType | null
  childFolders: FolderType[]
  childFiles: FileType[]
}

export type RootFolderType = {
  name: string
  id: string | null | undefined
  path:
    | []
    | {
        id: string | null | undefined
        name: string
      }[]
}

export type uploadingFileType = {
  id: string | number
  name: string
  progress: number
  error: boolean
}
