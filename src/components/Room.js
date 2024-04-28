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
import { FaStar, FaRegHeart, FaCamera } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Room = ({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  pk,
  isOwner,
}) => {
  const gray = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  const onCameraClick = event => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack spacing={-1.5} alignItems={'flex-start'}>
        <Box position={'relative'} overflow={'hidden'} mb={2} rounded={'2xl'}>
          <Image minH={'280'} src={imageUrl} />
          <Button
            variant={'unstyled'}
            position={'absolute'}
            top={0}
            right={0}
            color={'white'}
            onClick={onCameraClick}
          >
            {isOwner ? <FaCamera size={20} /> : <FaRegHeart size={20} />}
          </Button>
        </Box>
        <Grid gap={2} templateColumns={'6fr 1fr'}>
          <Text display={'block'} as={'b'} noOfLines={1} fontSize={'md'}>
            {name}
          </Text>
          <HStack _hover={{ color: 'red.300' }} spacing={1}>
            <FaStar size={15} />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color={gray}>
          {city}, {country}
        </Text>
        <Text fontSize={'sm'} color={gray}>
          <Text as={'b'}>${price}</Text>/ night
        </Text>
      </VStack>
    </Link>
  );
};

export default Room;
