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
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaUserAlt, FaLock, FaEnvelope, FaUserEdit } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { usernameSignUp } from '../api';

const SignUpModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const mutaion = useMutation({
    mutationFn: usernameSignUp,
    onSuccess: () => {
      reset();
    },
  });
  const onSubmit = ({ name, email, username, password }) => {
    mutaion.mutate({ name, email, username, password });
  };
  return (
    <Modal motionPreset="" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <VStack mb={5}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserEdit />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                variant={'filled'}
                placeholder="Name"
                {...register('name', { required: 'name을 입력해주세요' })}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                type="email"
                variant={'filled'}
                placeholder="Email"
                {...register('email', { required: 'email을 입력해주세요' })}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                variant={'filled'}
                placeholder="Username"
                {...register('username', {
                  required: 'username을 입력해주세요',
                })}
              />
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
                type="password"
                variant={'filled'}
                placeholder="Password"
                {...register('password', {
                  required: 'password를 입력해주세요',
                })}
              />
            </InputGroup>
            <Button type="submit" mt={4} w={'100%'} colorScheme="red">
              Sign up
            </Button>
            <SocialLogin />
          </VStack>
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
