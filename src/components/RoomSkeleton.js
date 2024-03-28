import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const RoomSkeleton = () => {
  return (
    <Box>
      <Skeleton mb={4} rounded={'2xl'} height={280} />
      <SkeletonText />
    </Box>
  );
};

export default RoomSkeleton;
