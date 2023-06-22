import type { InnPageIdEnum, InnPageNameEnum } from '../../enum/inn';
import type { InnInnResponseData } from './innInn';
import type { UserUserResponseData } from './userUser';

type InnPageResponseData = {
  id: InnPageIdEnum;
  name: InnPageNameEnum;
};

export declare type InnViewResponseData = {
  id: number;
  inn: InnInnResponseData;
  viewer: UserUserResponseData;
  page: InnPageResponseData;
  createTime: Date;
};
