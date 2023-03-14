import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../Layouts/Layout';
import AddButton from '../components/AddButton/AddButton';
import Home from '../pages/Home/Home';

const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser !== null ? (
    <Layout>
      <Outlet />
      <AddButton />
    </Layout>
  ) : (
    // <Login />
    <Home />
  );
};

export default ProtectedRoute;
