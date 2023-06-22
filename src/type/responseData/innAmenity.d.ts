import type { InnAmenityIdEnum, InnAmenityNameEnum } from '../../enum/inn';

export declare type InnAmenityResponseData =
  | {
      id: InnAmenityIdEnum.ToothbrushAndToothpaste;
      name: InnAmenityNameEnum.ToothbrushAndToothpaste;
    }
  | {
      id: InnAmenityIdEnum.ShampooAndConditioner;
      name: InnAmenityNameEnum.ShampooAndConditioner;
    }
  | {
      id: InnAmenityIdEnum.BodySoap;
      name: InnAmenityNameEnum.BodySoap;
    }
  | {
      id: InnAmenityIdEnum.FacialCleanser;
      name: InnAmenityNameEnum.FacialCleanser;
    }
  | {
      id: InnAmenityIdEnum.ShowerCap;
      name: InnAmenityNameEnum.ShowerCap;
    }
  | {
      id: InnAmenityIdEnum.Swabs;
      name: InnAmenityNameEnum.Swabs;
    }
  | {
      id: InnAmenityIdEnum.Cotton;
      name: InnAmenityNameEnum.Cotton;
    }
  | {
      id: InnAmenityIdEnum.HairBrush;
      name: InnAmenityNameEnum.HairBrush;
    }
  | {
      id: InnAmenityIdEnum.BathTowel;
      name: InnAmenityNameEnum.BathTowel;
    }
  | {
      id: InnAmenityIdEnum.FaceTowel;
      name: InnAmenityNameEnum.FaceTowel;
    }
  | {
      id: InnAmenityIdEnum.LoungeWear;
      name: InnAmenityNameEnum.LoungeWear;
    }
  | {
      id: InnAmenityIdEnum.FirstAidKit;
      name: InnAmenityNameEnum.FirstAidKit;
    };
