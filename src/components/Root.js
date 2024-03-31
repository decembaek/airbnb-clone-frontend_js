import { Box } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Root = () => {
  // toggle 할때 쓰이면 좋을듯

  return (
    <Box>
      {/* 위에 헤더 및 로그인 모달창 */}
      <Header />
      <Outlet />
      <ReactQueryDevtools />
    </Box>
  );
};

export default Root;
