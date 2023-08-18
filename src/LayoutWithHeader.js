import React, { useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

const LayoutWithHeader = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWithHeader;
