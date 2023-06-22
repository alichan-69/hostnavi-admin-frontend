import type { ReservationStatusIdEnum } from '../../enum/reseravtion';

export declare type ReservationReservationRequestParam = {
  innId: number;
  statusId: ReservationStatusIdEnum;
  reserverId: number;
  checkInTime: Date;
  checkOutTime: Date;
  guestNumber: number;
  fee: number;
};
