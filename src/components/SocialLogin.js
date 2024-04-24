import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaComment, FaGithub } from 'react-icons/fa';
import { redirect } from 'react-router-dom';

const SocialLogin = () => {
  const KakaoParams = {
    client_id: '1bb5a78959b5f59b1b5a144d30a816b4',
    redirect_uri: 'http://localhost:3001/social/kakao',
    response_type: 'code',
  };
  const GithubParams = {
    client_id: '52023d9e05ce9e891654',
    scope: 'read:user,user:email',
  };
  const KakaoSearchParams = new URLSearchParams(KakaoParams).toString();
  const GithubSearchParams = new URLSearchParams(GithubParams).toString();
  return (
    <Box w={'100%'}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={'uppercase'}
          color={'gray.400'}
          fontSize={'xs'}
          as={'b'}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack w={'100%'}>
        <Button
          as={'a'}
          href={`https://github.com/login/oauth/authorize?${GithubSearchParams}`}
          // href="https://github.com/login/oauth/authorize?client_id=52023d9e05ce9e891654&scope=read:user,user:email"
          w={'100%'}
          colorScheme="gray"
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as="a"
          w={'100%'}
          href={`https://kauth.kakao.com/oauth/authorize?${KakaoSearchParams}`}
          colorScheme="yellow"
          leftIcon={<FaComment />}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
};

export default SocialLogin;

// User ---> Github
// Github ---> Website / url 주소로 정보 보내줌 / 127.0.0.1/confirm-gh?token=토큰정보

// 토큰정보 ----> 백엔드 Django
// Django ----> Github API
