import { Grid } from '@chakra-ui/react';

import React from 'react';
import Room from '../components/Room';

const Home = () => {
  return (
    // <Grid templateColumns={'200px 200px 200px 200px 200px'}>
    <Grid
      mt={10}
      // px={40}
      px={{
        sm: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      // templateColumns={'repeat(5, 1fr)'}
      templateColumns={{
        sm: '1fr',
        md: '1fr 1fr',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
        '2xl': 'repeat(5, 1fr)',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 8, 9, 9, 2, 2].map(index => (
        <Room />
      ))}
    </Grid>
  );
};

export default Home;
