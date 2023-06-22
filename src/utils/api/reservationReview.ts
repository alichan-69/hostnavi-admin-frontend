import type { AxiosResponse } from 'axios';
import type { ReservationReviewRequestParam } from '../../type/requestParam/reservationReview';
import type { ReservationReviewResponseData } from '../../type/responseData/reservationReview';
import { axiosJwtRequest } from './common';
import type { BaseResponse, PagedResponseData } from './common';

export const createReview = async (param: ReservationReviewRequestParam) => {
  return await axiosJwtRequest()
    .post(`/reviews`, param)
    .then((response: AxiosResponse<BaseResponse<ReservationReviewResponseData>>) => {
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

export const updateReview = async (id: number, param: ReservationReviewRequestParam) => {
  return await axiosJwtRequest()
    .put(`/reviews/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<ReservationReviewResponseData>>) => {
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

export const deleteReview = async (id: number) => {
  return await axiosJwtRequest()
    .delete(`/reviews/${id}`)
    .then((response: AxiosResponse<BaseResponse<ReservationReviewResponseData>>) => {
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

export const deleteBulkReviews = async (ids: number[]) => {
  return await axiosJwtRequest()
    .delete(`/reviews/bulk/${ids.join(',')}`)
    .then((response: AxiosResponse<BaseResponse<ReservationReviewResponseData[]>>) => {
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

export const getAllReviews = async (ownerId?: number, reviewerId?: number) => {
  const params = {
    'owner-id': ownerId || null,
    'reviewer-id': reviewerId || null,
  };

  return await axiosJwtRequest()
    .get('/reviews/all', { params })
    .then((response: AxiosResponse<BaseResponse<ReservationReviewResponseData[]>>) => {
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

export const getReview = async (id: number) => {
  return await axiosJwtRequest()
    .get(`/reviews/${id}`)
    .then((response: AxiosResponse<BaseResponse<ReservationReviewResponseData>>) => {
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

export const getPagedReviews = async (pageNumber: number, pageSize: number) => {
  const params = {
    'page-number': pageNumber,
    'page-size': pageSize,
  };

  return await axiosJwtRequest()
    .get('/reviews', { params })
    .then((response: AxiosResponse<BaseResponse<PagedResponseData<ReservationReviewResponseData[]>>>) => {
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
