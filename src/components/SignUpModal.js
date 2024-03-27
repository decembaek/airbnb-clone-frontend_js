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

const SignUpModal = ({ isOpen, onClose }) => {
  return (
    <Modal motionPreset="" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack mb={5}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserEdit />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="Name" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="Email" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="Password" />
            </InputGroup>
            <Button mt={4} w={'100%'} colorScheme="red">
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
