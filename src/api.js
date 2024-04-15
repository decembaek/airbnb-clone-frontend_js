import axios from 'axios';
import Cookies from 'js-cookie';
// import Cookie
// import { QueryFunctionContext } from '@tanstack/react-query';
const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1/',
  baseURL: 'http://localhost:8000/api/v1/',
  // 쿠키를 포함할려면 아래 구문 추가 withCredentials
  withCredentials: true,
  // baseURL: 'http://localhost:8000/api/v1/',
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

export const getMe = async () => {
  // if (!Cookies.get('csrftoken')) {
  //   return;
  // }
  const res = await axiosInstance.get(`users/me`);
  return res.data;
};

export const logOut = () => {
  const res = axiosInstance.post(`users/log-out`, null, {
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken') || '',
    },
  });
  return res.data;
};

export const githubLogin = async code => {
  const response = await axiosInstance.post(
    `/users/github`,
    { code },
    {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    }
  );
  return response.status;
};
