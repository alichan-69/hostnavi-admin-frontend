import type { ReservationResponseData } from './reservationReservation';
import type { UserUserResponseData } from './userUser';

export declare type WebSocketReservationMessageResponseData = {
  id: number;
  reservationId: number;
  senderId: number;
  receiverId: number;
  message: string;
  sendTime: Date;
};

export declare type ReservationMessageResponseData = {
  id: number;
  reservation: ReservationResponseData;
  sender: UserUserResponseData;
  receiver: UserUserResponseData;
  message: string;
  sendTime: Date;
};
