import type { AxiosResponse } from 'axios';
import type { InnInnRequestParam } from '../../type/requestParam/innInn';
import type { InnInnResponseData } from '../../type/responseData/innInn';
import { axiosJwtRequest, axiosJwtFormDataRequest } from './common';
import type { BaseResponse, PagedResponseData } from './common';
import type { InnImagesRequestParam } from '../../type/requestParam/innImage';
import type { InnImageResponseData } from '../../type/responseData/innImage';

export const createInn = async (param: InnInnRequestParam) => {
  return await axiosJwtRequest()
    .post(`/inns`, param)
    .then((response: AxiosResponse<BaseResponse<InnInnResponseData>>) => {
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

export const updateInn = async (id: number, param: InnInnRequestParam) => {
  return await axiosJwtRequest()
    .put(`/inns/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<InnInnResponseData>>) => {
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

export const deleteInn = async (id: number) => {
  return await axiosJwtRequest()
    .delete(`/inns/${id}`)
    .then((response: AxiosResponse<BaseResponse<InnInnResponseData>>) => {
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

export const deleteBulkInns = async (ids: number[]) => {
  return await axiosJwtRequest()
    .delete(`/inns/bulk/${ids.join(',')}`)
    .then((response: AxiosResponse<BaseResponse<InnInnResponseData[]>>) => {
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

export const getAllInns = async (ownerId: number) => {
  const params = {
    'owner-id': ownerId || null,
  };

  return await axiosJwtRequest()
    .get('/inns/all', { params })
    .then((response: AxiosResponse<BaseResponse<InnInnResponseData[]>>) => {
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

export const getInn = async (id: number) => {
  return await axiosJwtRequest()
    .get(`/inns/${id}`)
    .then((response: AxiosResponse<BaseResponse<InnInnResponseData>>) => {
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

export const getPagedInns = async (pageNumber: number, pageSize: number) => {
  return await axiosJwtRequest()
    .get(`/inns?page-number=${pageNumber}&page-size=${pageSize}`)
    .then((response: AxiosResponse<BaseResponse<PagedResponseData<InnInnResponseData[]>>>) => {
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

export const createInnImage = async (id: number, param: InnImagesRequestParam) => {
  return await axiosJwtFormDataRequest()
    .post(`/inns/image/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<InnImageResponseData[]>>) => {
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
