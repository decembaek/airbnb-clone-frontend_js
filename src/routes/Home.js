import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Room from '../components/Room';
import RoomSkeleton from '../components/RoomSkeleton';
import { getRooms } from '../api';

const Home = () => {
  // const { isLoading, data } = useQuery(['rooms'], getRooms); 버전이 다름
  const { isLoading, data } = useQuery({
    queryKey: 'rooms',
    queryFn: getRooms,
  });
  // api.js 로 아래 함수 이동
  // const [isLoading, setIsLoading] = useState(true);
  // const [rooms, setRooms] = useState([]);
  // const fetchRooms = async () => {
  //   const response = await fetch('http://127.0.0.1:8000/api/v1/rooms/');
  //   const json = await response.json();
  //   setRooms(json);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   fetchRooms();
  // }, []);
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
      {/* {[1, 2, 3, 4, 5, 6, 8, 9, 9, 2, 2].map(index => (
        <Room />
      ))} */}
      {isLoading ? (
        <>
          <RoomSkeleton />
        </>
      ) : (
        data.map(room => (
          <Room
            key={room.pk}
            pk={room.pk}
            isOwner={room.is_owner}
            imageUrl={room.photos[0]?.file}
            name={room.name}
            rating={room.rating}
            city={room.city}
            country={room.country}
            price={room.price}
          />
        ))
      )}
    </Grid>
  );
};
// imageUrl, name, rating, city, country, price
export default Home;
