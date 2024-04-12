import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { Link } from 'react-router-dom';
import useUser from '../lib/useUser';
import { logOut } from '../api';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const { userLoading, user, isLoggedIn } = useUser();
  // console.log(userLoading, user, isLoggedIn);
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  // const { colorMode, toggleColorMode } = useColorMode();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue('red.500', 'red.200');
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: 'Login out...',
      description: 'See you later!',
      status: 'loading',
      position: 'bottom-right',
      // duration: 2000,
      // isClosable: true,
    });
    await logOut();
    queryClient.refetchQueries(['me']);
    toast.update(toastId, {
      status: 'success',
      title: 'Done!',
      description: 'See you later',
      duration: 1000,
    });
  };
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      py={'5'}
      px={'40'}
      direction={{
        sm: 'column',
        md: 'row',
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Link to={'/'}>
        <Box color={logoColor}>
          <FaAirbnb size={48} />
        </Box>
      </Link>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={'ghost'}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme="red">
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user.name} src={user.src} size={'md'} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      {/* Modal 창 */}
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      {/* Modal 창 */}
    </Stack>
  );
};

export default Header;
