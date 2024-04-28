import React, { useEffect } from 'react';
import useUser from '../lib/useUser';
import { useNavigate } from 'react-router-dom';

const HostOnlyPage = ({ children }) => {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user.is_host) {
        navigate('/');
      }
    }
  }, [user, userLoading, navigate]);
  return <>{children}</>;
};

export default HostOnlyPage;
