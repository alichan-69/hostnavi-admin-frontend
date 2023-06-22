import { UserCreditCardRequestParam } from './userCreditCard';

export declare type UserUserRequestParam = {
  imageUrl?: string;
  name: string;
  description: string | null;
  address: string;
  occupation: string | null;
  phoneNumber: string;
  mail: string;
  password: string;
  creditCard: UserCreditCardRequestParam;
  facebookUrl: string | null;
  instagramUrl: string | null;
  twitterUrl: string | null;
};

export declare type UpdatedUserUserRequestParam = {
  imageUrl?: string;
  name: string;
  description: string | null;
  address: string;
  occupation: string | null;
  phoneNumber: string;
  mail: string;
  password: string;
  creditCard: UserCreditCardRequestParam | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  twitterUrl: string | null;
};

export declare type AuthUserRequestParam = {
  mail: string;
  password: string;
};
