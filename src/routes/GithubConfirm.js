import { Heading, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { githubLogin } from '../api';
import { useQueryClient } from '@tanstack/react-query';

const GithubConfirm = () => {
  // const location = useLocation();
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await githubLogin(code);
      if (status === 200) {
        toast({
          status: 'success',
          title: 'Welcome!',
          position: 'bottom-right',
          description: 'Git hub login',
        });
        queryClient.refetchQueries(['me']);
        navigate('/');
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={'center'} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={'lg'} />
    </VStack>
  );
};

export default GithubConfirm;
