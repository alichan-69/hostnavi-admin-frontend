import type { AxiosResponse } from 'axios';
import type { ReservationMessageResponseData, WebSocketReservationMessageResponseData } from '../../type/responseData/reservationMessage';
import { axiosJwtRequest } from './common';
import type { BaseResponse } from './common';

export const getAllMessages = async (reservationId?: number) => {
  const params = {
    'reservation-id': reservationId || null,
  };

  return await axiosJwtRequest()
    .get('/messages', { params })
    .then((response: AxiosResponse<BaseResponse<WebSocketReservationMessageResponseData[]>>) => {
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

export const getSameReservationsLastMessages = async (ownerId?: number) => {
  const params = {
    'owner-id': ownerId || null,
  };

  return await axiosJwtRequest()
    .get('/messages/same-reservations-lasts', { params })
    .then((response: AxiosResponse<BaseResponse<ReservationMessageResponseData[]>>) => {
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
