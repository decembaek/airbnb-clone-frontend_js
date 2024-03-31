import axios from 'axios';
// import { QueryFunctionContext } from '@tanstack/react-query';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

// const BASE_URL = 'http://127.0.0.1:8000/api/v1';

// export async function getRooms() {
//   const response = await fetch(`${BASE_URL}/rooms/`);
//   const json = await response.json();
//   return json;
// }

// rooms list
// export async function getRooms() {
//   const response = await axiosInstance.get(`rooms/`);
//   return response.data;
// }
export const getRooms = () =>
  axiosInstance.get('rooms/').then(response => response.data);

// room detail
export const getRoom = ({ queryKey }) => {
  const [, roomPk] = queryKey;
  return axiosInstance.get(`rooms/${roomPk}`).then(response => response.data);
};

export const getRoomReviews = ({ queryKey }) => {
  const [, roomPk] = queryKey;
  return axiosInstance
    .get(`rooms/${roomPk}/reviews`)
    .then(response => response.data);
};
