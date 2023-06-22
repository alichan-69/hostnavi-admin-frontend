import axios from 'axios';
import Cookies from 'js-cookie';

export declare type BaseResponse<Data> = {
  data: Data;
  message: string;
};

export declare type PagedResponseData<List> = {
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  total: number;
  list: List;
};

export const axiosRequest = () => {
  return axios.create({
    baseURL: process.env['NEXT_PUBLIC_REST_API_BASE_URL'] as string,
  });
};

export const axiosJwtRequest = () => {
  const jwt = Cookies.get('X-AUTH-TOKEN') as string;

  return axios.create({
    baseURL: process.env['NEXT_PUBLIC_REST_API_BASE_URL'] as string,
    headers: {
      'X-AUTH-TOKEN': 'Bearer ' + jwt,
    },
  });
};

export const axiosFormDataRequest = () => {
  return axios.create({
    baseURL: process.env['NEXT_PUBLIC_REST_API_BASE_URL'] as string,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const axiosJwtFormDataRequest = () => {
  const jwt = Cookies.get('X-AUTH-TOKEN') as string;

  return axios.create({
    baseURL: process.env['NEXT_PUBLIC_REST_API_BASE_URL'] as string,
    headers: {
      'X-AUTH-TOKEN': 'Bearer ' + jwt,
      'Content-Type': 'multipart/form-data',
    },
  });
};
