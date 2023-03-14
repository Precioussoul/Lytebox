import { createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Favorites from './pages/Favorites/Favorites';
import Recents from './pages/Recents/Recents';
import Trash from './pages/Trash/Trash';
import { color } from './theme';
import Search from './pages/Search/Search';
import Login from './Authentication/Login/Login';
import SignUp from './Authentication/Signup/SignUp';
import ForgetPassword from './Authentication/ForgetPassword/ForgetPassword';
import ProtectedRoute from './Authentication/ProtectedRoute';
import AuthProvider from './contexts/AuthContext';
import AccSettings from './pages/Acc-settings/AccSettings';
import GenSettings from './pages/Gen-settings/GenSettings';
import FolderDetails from './pages/FolderDetails/FolderDetails';
import FileAndFolderProvider from './contexts/FileAndFolderContext';
import OtherFilesFilter from './pages/Others/OtherFilesFilter';
import ImageFilter from './pages/Images/ImageFilter';
import VideoFilter from './pages/Videos/VideoFilter';
import AudioFilter from './pages/Audios/AudioFilter';
import DocsFilter from './pages/Documents/DocsFilter';
import { ThemeContextType } from './types';

export const ThemeContext = React.createContext<ThemeContextType>(
  {} as ThemeContextType
);

function App() {
  let jMode = localStorage.getItem('mode');
  const localMode = jMode ? JSON.parse(jMode) : 'light';
  const [mode, setMode] = useState(localMode);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);

  const value: ThemeContextType = {
    mode,
    setMode,
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: color.primaryColor2,
        light: color.primaryColor,
      },
      secondary: {
        main: color.secondaryColor,
        light: color.secondaryColor2,
      },
      mode: mode,
    },
  });
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <FileAndFolderProvider>
            <Router>
              <Routes>
                {/* Authentication */}
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgot-password' element={<ForgetPassword />} />
                <Route path='/' element={<ProtectedRoute />}>
                  <Route index path='' element={<Dashboard />} />
                  <Route
                    path='/folder/:folder_Id'
                    element={<FolderDetails />}
                  />
                  <Route path='trash' element={<Trash />} />
                  <Route path='recents' element={<Recents />} />
                  <Route path='favorite' element={<Favorites />} />
                  <Route path='search' element={<Search />} />
                  <Route path='acc-settings' element={<AccSettings />} />
                  <Route path='gen-settings' element={<GenSettings />} />
                  <Route path='documents' element={<DocsFilter />} />
                  <Route path='audios' element={<AudioFilter />} />
                  <Route path='videos' element={<VideoFilter />} />
                  <Route path='images' element={<ImageFilter />} />
                  <Route path='others' element={<OtherFilesFilter />} />
                </Route>
              </Routes>
            </Router>
          </FileAndFolderProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
