import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaStar, FaRegHeart } from 'react-icons/fa';

const Room = () => {
  const gray = useColorModeValue('gray.600', 'gray.300');
  return (
    <VStack spacing={-1.5} alignItems={'flex-start'}>
      <Box position={'relative'} overflow={'hidden'} mb={2} rounded={'2xl'}>
        <Image
          minH={'280'}
          src="https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=720"
        />
        <Button
          variant={'unstyled'}
          position={'absolute'}
          top={0}
          right={0}
          color={'white'}
        >
          <FaRegHeart size={20} />
        </Button>
      </Box>
      <Grid gap={2} templateColumns={'6fr 1fr'}>
        <Text display={'block'} as={'b'} noOfLines={1} fontSize={'md'}>
          제주도 제주시 한라산
        </Text>
        <HStack spacing={1}>
          <FaStar size={15} />
          <Text>5.0</Text>
        </HStack>
      </Grid>
      <Text fontSize={'sm'} color={gray}>
        Seoul, S. Korea
      </Text>
      <Text fontSize={'sm'} color={gray}>
        <Text as={'b'}>$72</Text>/ night
      </Text>
    </VStack>
  );
};

export default Room;
