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
        <Button w={'100%'} colorScheme="gray" leftIcon={<FaGithub />}>
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
