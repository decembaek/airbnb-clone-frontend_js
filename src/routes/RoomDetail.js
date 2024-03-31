import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../api';

const RoomDetail = () => {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: [`room:${roomPk}`],
    queryFn: getRoom,
  });
  console.log(data);
  //   console.log(params);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default RoomDetail;
