import type { AxiosResponse } from 'axios';
import type { ReservationReservationRequestParam } from '../../type/requestParam/reservationReservation';
import type { ReservationReservationResponseData } from '../../type/responseData/reservationReservation';
import { axiosJwtRequest } from './common';
import type { BaseResponse, PagedResponseData } from './common';
import { dayJs } from '../day';

export const createReservation = async (param: ReservationReservationRequestParam) => {
  return await axiosJwtRequest()
    .post(`/reservations`, param)
    .then((response: AxiosResponse<BaseResponse<ReservationReservationResponseData>>) => {
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

export const updateReservation = async (id: number, param: ReservationReservationRequestParam) => {
  return await axiosJwtRequest()
    .put(`/reservations/${id}`, param)
    .then((response: AxiosResponse<BaseResponse<ReservationReservationResponseData>>) => {
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

export const deleteReservation = async (id: number) => {
  return await axiosJwtRequest()
    .delete(`/reservations/${id}`)
    .then((response: AxiosResponse<BaseResponse<ReservationReservationResponseData>>) => {
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

export const getAllReservations = async (ownerId?: number, checkInTimeAfter?: Date, checkInTimeBefore?: Date, statusIds?: number[]) => {
  const params = {
    'owner-id': ownerId || null,
    'check-in-time-after': checkInTimeAfter ? dayJs(checkInTimeAfter).format('YYYY-MM-DDTHH:mm:ss') : null,
    'check-in-time-before': checkInTimeBefore ? dayJs(checkInTimeBefore).format('YYYY-MM-DDTHH:mm:ss') : null,
    'status-ids': statusIds?.join(',') || null,
  };

  return await axiosJwtRequest()
    .get('/reservations/all', { params })
    .then((response: AxiosResponse<BaseResponse<ReservationReservationResponseData[]>>) => {
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

export const getReservation = async (id: number) => {
  return await axiosJwtRequest()
    .get(`/reservations/${id}`)
    .then((response: AxiosResponse<BaseResponse<ReservationReservationResponseData>>) => {
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

export const getPagedReservations = async (pageNumber: number, pageSize: number, checkInTimeAfter?: Date, checkInTimeBefore?: Date) => {
  const params = {
    'page-number': pageNumber,
    'page-size': pageSize,
    'check-in-time-after': checkInTimeAfter ? dayJs(checkInTimeAfter).format('YYYY-MM-DDTHH:mm:ss') : null,
    'check-in-time-before': checkInTimeBefore ? dayJs(checkInTimeBefore).format('YYYY-MM-DDTHH:mm:ss') : null,
  };

  return await axiosJwtRequest()
    .get('/reservations', { params })
    .then((response: AxiosResponse<BaseResponse<PagedResponseData<ReservationReservationResponseData[]>>>) => {
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
