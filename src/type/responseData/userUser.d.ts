import type { UserCreditCardResponseData } from './userCreditCard';

export declare type UserUserResponseData = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  address: string;
  occupation: string;
  phoneNumber: string;
  mail: string;
  creditCard: UserCreditCardResponseData;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  createTime: Date;
  updateTime: Date;
};
