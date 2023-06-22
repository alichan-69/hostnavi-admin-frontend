import type { ReservationStatusIdEnum, ReservationStatusNameEnum } from '../../enum/reseravtion';
import type { InnInnResponseData } from './innInn';
import type { UserUserResponseData } from './userUser';

type ReservationStatus =
  | { id: ReservationStatusIdEnum.ComingSoonArrival; name: ReservationStatusNameEnum.ComingSoonArrival }
  | { id: ReservationStatusIdEnum.HostingNow; name: ReservationStatusNameEnum.HostingNow }
  | { id: ReservationStatusIdEnum.PendingReview; name: ReservationStatusNameEnum.PendingReview }
  | { id: ReservationStatusIdEnum.Reviewed; name: ReservationStatusNameEnum.Reviewed }
  | { id: ReservationStatusIdEnum.Canceled; name: ReservationStatusNameEnum.Canceled };

export declare type ReservationReservationResponseData = {
  id: number;
  inn: InnInnResponseData;
  status: ReservationStatus;
  reserver: UserUserResponseData;
  checkInTime: Date;
  checkOutTime: Date;
  guestNumber: number;
  fee: number;
  createTime: Date;
  updateTime: Date;
};
