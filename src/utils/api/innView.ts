import type { AxiosResponse } from 'axios';
import type { InnViewRequestParam } from '../../type/requestParam/innView';
import type { InnViewResponseData } from '../../type/responseData/innView';
import { axiosJwtRequest } from './common';
import type { BaseResponse, PagedResponseData } from './common';
import { dayJs } from '../day';

export const createView = async (param: InnViewRequestParam) => {
  return await axiosJwtRequest()
    .post(`/views`, param)
    .then((response: AxiosResponse<BaseResponse<InnViewResponseData>>) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};

export const updateView = async (id: number, param: InnViewRequestParam) => {
  return await axiosJwtRequest()
    .put(`/views/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<InnViewResponseData>>) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};

export const deleteView = async (id: number) => {
  return await axiosJwtRequest()
    .delete(`/views/${id}`)
    .then((response: AxiosResponse<BaseResponse<InnViewResponseData>>) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};

export const getAllViews = async (ownerId?: number, createTimeAfter?: Date, createTimeBefore?: Date) => {
  const params = {
    'owner-id': ownerId || null,
    'create-time-after': createTimeAfter ? dayJs(createTimeAfter).format('YYYY-MM-DDTHH:mm:ss') : null,
    'create-time-before': createTimeBefore ? dayJs(createTimeBefore).format('YYYY-MM-DDTHH:mm:ss') : null,
  };

  return await axiosJwtRequest()
    .get('/views/all', { params })
    .then((response: AxiosResponse<BaseResponse<InnViewResponseData[]>>) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};

export const getView = async (id: number) => {
  return await axiosJwtRequest()
    .get(`/views/${id}`)
    .then((response: AxiosResponse<BaseResponse<InnViewResponseData>>) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};

export const getPagedViews = async (pageNumber: number, pageSize: number) => {
  const params = {
    'page-number': pageNumber,
    'page-size': pageSize,
  };

  return await axiosJwtRequest()
    .get('/views', { params })
    .then((response: AxiosResponse<BaseResponse<PagedResponseData<InnViewResponseData[]>>>) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};
