import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import React, { ReactNode, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { AuthGlobalType } from '../types'

// create a useContext api for data carriage without passing props down manually

export const AuthContext = React.createContext<AuthGlobalType>(
  {} as AuthGlobalType
)

// useContext api creation ends here

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | any>()
  const [loading, setLoading] = useState(true)

  //signing up users
  function signupUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const provider = new GoogleAuthProvider()

  function signinWithGoogle(
    setError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    navigate: any
  ) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user: User = result.user
        setCurrentUser(user)
        setLoading(true)
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message
        setError(errorMessage)
        setLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  //logging in users
  function loginUser(
    email: string,
    password: string,
    setError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    navigate: any
  ) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(true)
        navigate('/')
      })
      .catch(() => {
        setError('Failed to sign-in, check your credential or internet')
        setLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  //logging out users
  function logout() {
    return signOut(auth)
  }
  // delete user account
  function deleteUserAccount(currentUser: User, navigate: any, setError: any) {
    return deleteUser(currentUser)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setError(`${error.message}`)
      })
  }

  function updateUserProfile(
    name: string,
    photo: string,
    setError: any,
    navigate: any
  ) {
    return updateProfile(currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      setError('')
      navigate('/')
    })
  }

  // reset password
  async function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }
  // update Email
  function updateEmailAddress(email: string) {
    return updateEmail(currentUser, email)
  }
  // verify email address
  function verifyEmailAddress(user: any, message: (msg: string) => void) {
    return sendEmailVerification(user)
      .then(() => {
        message('please check your email address for further instruction')
      })
      .catch(() => {
        message('please try again')
      })
  }
  // update Password
  function updateCurrentPassword(password: string) {
    return updatePassword(currentUser, password)
  }

  // using UseEffect to run function when application load
  useEffect(() => {
    // firebase auto detect current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signupUser,
    loginUser,
    logout,
    updateUserProfile,
    resetPassword,
    verifyEmailAddress,
    updateEmailAddress,
    updateCurrentPassword,
    deleteUserAccount,
    signinWithGoogle,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
