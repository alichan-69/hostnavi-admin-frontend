import type { UserUserResponseData } from './userUser';
import type { InnAmenityResponseData } from './innAmenity';
import type { InnFacilityResponseData } from './innFacility';
import type { InnStatusIdEnum, InnStatusNameEnum, InnTypeIdEnum, InnTypeNameEnum } from '../../enum/inn';
import type { InnImageResponseData } from './innImage';

export declare type InnStatusResponseData =
  | { id: InnStatusIdEnum.Published; name: InnStatusNameEnum.Published }
  | { id: InnStatusIdEnum.StopPublishing; name: InnStatusNameEnum.StopPublishing };

export declare type InnTypeResponseData =
  | { id: InnTypeIdEnum.DetachedHouse; name: InnTypeNameEnum.DetachedHouse }
  | { id: InnTypeIdEnum.PrivateRoom; name: InnTypeNameEnum.PrivateRoom }
  | { id: InnTypeIdEnum.SharedRoom; name: InnTypeNameEnum.SharedRomm };

export declare type InnInnResponseData = {
  id: number;
  name: string;
  description: string;
  fee: number;
  status: InnStatusResponseData;
  type: InnTypeResponseData;
  address: string;
  guestNumber: number;
  bedroomNumber: number;
  bedNumber: number;
  bathroomNumber: number;
  amenityList: InnAmenityResponseData[];
  facilityList: InnFacilityResponseData[];
  imageList: InnImageResponseData[];
  user: UserUserResponseData;
  createTime: Date;
  updateTime: Date;
};
