import type { InnAmenityIdEnum, InnFacilityIdEnum, InnStatusIdEnum, InnTypeIdEnum } from '../../enum/inn';

export declare type InnInnRequestParam = {
  userId: number;
  name: string;
  description: string | null;
  fee: number;
  statusId: InnStatusIdEnum;
  typeId: InnTypeIdEnum;
  address: string;
  guestNumber: number;
  bedroomNumber: number;
  bedNumber: number;
  bathroomNumber: number;
  amenityIdList: InnAmenityIdEnum[];
  facilityIdList: InnFacilityIdEnum[];
};
