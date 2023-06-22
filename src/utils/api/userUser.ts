import type { AxiosResponse } from 'axios';
import type { UserUserRequestParam, UpdatedUserUserRequestParam, AuthUserRequestParam } from '../../type/requestParam/userUser';
import type { UserUserResponseData } from '../../type/responseData/userUser';
import { axiosRequest, axiosJwtRequest, axiosFormDataRequest } from './common';
import type { BaseResponse, PagedResponseData } from './common';
import type { UserImageRequestParam } from '../../type/requestParam/userImage';
import type { UserImageResponseData } from '../../type/responseData/userImage';

export const createUser = async (param: UserUserRequestParam) => {
  return await axiosRequest()
    .post(`/users`, param)
    .then((response: AxiosResponse<BaseResponse<UserUserResponseData>>) => {
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

export const createUserImage = async (id: number, param: UserImageRequestParam) => {
  return await axiosFormDataRequest()
    .post(`/users/image/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<UserImageResponseData>>) => {
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

export const updateUser = async (id: number, param: UpdatedUserUserRequestParam) => {
  return await axiosRequest()
    .put(`/users/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<UserUserResponseData>>) => {
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

export const deleteUser = async (id: number) => {
  return await axiosJwtRequest()
    .delete(`/users/${id}`)
    .then((response: AxiosResponse<BaseResponse<UserUserResponseData>>) => {
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

export const getAllUsers = async () => {
  return await axiosJwtRequest()
    .get('/users/all')
    .then((response: AxiosResponse<BaseResponse<UserUserResponseData[]>>) => {
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

export const getUser = async (id: number) => {
  return await axiosJwtRequest()
    .get(`/users/${id}`)
    .then((response: AxiosResponse<BaseResponse<UserUserResponseData>>) => {
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

export const getPagedUsers = async (pageNumber: number, pageSize: number) => {
  const params = {
    'page-number': pageNumber,
    'page-size': pageSize,
  };

  return await axiosJwtRequest()
    .get('users', { params })
    .then((response: AxiosResponse<BaseResponse<PagedResponseData<UserUserResponseData[]>>>) => {
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

export const login = async (param: AuthUserRequestParam) => {
  return await axiosRequest()
    .post('/auth/login', param)
    .then((response: AxiosResponse<BaseResponse<null>>) => {
      if (response.status === 200) {
        return response.headers['x-auth-token'];
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error();
    });
};
