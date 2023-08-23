import React, { useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import AdminHeader from './components/admin/AdminHeader';
import AdminFooter from './components/admin/AdminFooter';

const AdminLayout = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
