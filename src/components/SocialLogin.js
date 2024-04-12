import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaComment, FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
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
          href="https://github.com/login/oauth/authorize?client_id=52023d9e05ce9e891654&scope=read:user,user:email"
          w={'100%'}
          colorScheme="gray"
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button w={'100%'} colorScheme="yellow" leftIcon={<FaComment />}>
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
