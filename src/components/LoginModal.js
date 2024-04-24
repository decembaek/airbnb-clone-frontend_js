import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usernameLogin } from '../api';

const LoginModal = ({ isOpen, onClose }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const onChange = event => {
  //   const { name, value } = event.currentTarget;
  //   if (name === 'username') {
  //     setUsername(value);
  //   } else if (name === 'password') {
  //     setPassword(value);
  //   }
  // };
  // const onSubmit = event => {
  //   event.preventDefault();
  //   console.log(username, password);
  // };
  const toast = useToast();
  const queryClint = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const mutaion = useMutation({
    mutationFn: usernameLogin,
    onMutate: () => {
      // console.log('mutation');
    },
    onSuccess: () => {
      toast({
        title: 'Welcome back!',
        status: 'success',
      });
      onClose();
      queryClint.refetchQueries(['me']);
      reset();
    },
    onError: () => {},
  });
  const onSubmit = ({ username, password }) => {
    mutaion.mutate({ username, password });
  };

  return (
    <Modal motionPreset="" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <VStack mb={5}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register('username', {
                  required: 'username을 작성해주세요',
                })}
                variant={'filled'}
                placeholder="Username"
              />
              <Text fontSize={'sm'} color={'red.500'}>
                {errors.username?.message}
              </Text>
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register('password', {
                  required: 'password를 작성해주세요',
                })}
                variant={'filled'}
                placeholder="Password"
                type="password"
              />
              <Text fontSize={'sm'} color={'red.500'}>
                {errors.password?.message}
              </Text>
            </InputGroup>
            {mutaion.isError ? (
              <Text color={'red.500'} textAlign={'center'} fontSize={'sm'}>
                Username or Password are wrong
              </Text>
            ) : null}
            <Button
              isLoading={mutaion.isLoading}
              type="submit"
              mt={4}
              w={'100%'}
              colorScheme="red"
            >
              Log in
            </Button>
            <SocialLogin />
          </VStack>
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
