import type { ReservationResponseData } from './reservationReservation';

export declare type ReservationReviewResponseData = {
  id: number;
  reservation: ReservationResponseData;
  review: string;
  cleanScore: number;
  serviceScore: number;
  facilityScore: number;
  communicationScore: number;
  locationScore: number;
  checkInSupportScore: number;
  feeScore: number;
  createTime: Date;
  updateTime: Date;
};
