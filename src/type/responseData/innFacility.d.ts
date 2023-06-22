import type { InnFacilityIdEnum, InnFacilityNameEnum } from '../../enum/inn';

export declare type InnFacilityResponseData =
  | {
      id: InnFacilityIdEnum.WiFi;
      name: InnFacilityNameEnum.WiFi;
    }
  | {
      id: InnFacilityIdEnum.TV;
      name: InnFacilityNameEnum.TV;
    }
  | {
      id: InnFacilityIdEnum.Kitchen;
      name: InnFacilityNameEnum.Kitchen;
    }
  | {
      id: InnFacilityIdEnum.WashingMachine;
      name: InnFacilityNameEnum.WashingMachine;
    }
  | {
      id: InnFacilityIdEnum.Parking;
      name: InnFacilityNameEnum.Parking;
    }
  | {
      id: InnFacilityIdEnum.AirConditioner;
      name: InnFacilityNameEnum.AirConditioner;
    }
  | {
      id: InnFacilityIdEnum.Pool;
      name: InnFacilityNameEnum.Pool;
    }
  | {
      id: InnFacilityIdEnum.OutdoorBathOrJacuzzi;
      name: InnFacilityNameEnum.OutdoorBathOrJacuzzi;
    }
  | {
      id: InnFacilityIdEnum.RooftopTerrace;
      name: InnFacilityNameEnum.RooftopTerrace;
    }
  | {
      id: InnFacilityIdEnum.Garden;
      name: InnFacilityNameEnum.Garden;
    }
  | {
      id: InnFacilityIdEnum.OutdoorCookingFacilities;
      name: InnFacilityNameEnum.OutdoorCookingFacilities;
    }
  | {
      id: InnFacilityIdEnum.BoardGames;
      name: InnFacilityNameEnum.BoardGames;
    }
  | {
      id: InnFacilityIdEnum.VideoGames;
      name: InnFacilityNameEnum.VideoGames;
    }
  | {
      id: InnFacilityIdEnum.GameTable;
      name: InnFacilityNameEnum.GameTable;
    }
  | {
      id: InnFacilityIdEnum.ExerciseEquipment;
      name: InnFacilityNameEnum.ExerciseEquipment;
    }
  | {
      id: InnFacilityIdEnum.BreakfastIncluded;
      name: InnFacilityNameEnum.BreakfastIncluded;
    }
  | {
      id: InnFacilityIdEnum.LunchIncluded;
      name: InnFacilityNameEnum.LunchIncluded;
    }
  | {
      id: InnFacilityIdEnum.DinnerIncluded;
      name: InnFacilityNameEnum.DinnerIncluded;
    }
  | {
      id: InnFacilityIdEnum.BikeRental;
      name: InnFacilityNameEnum.BikeRental;
    }
  | {
      id: InnFacilityIdEnum.FireAlarm;
      name: InnFacilityNameEnum.FireAlarm;
    }
  | {
      id: InnFacilityIdEnum.FireExtinguisher;
      name: InnFacilityNameEnum.FireExtinguisher;
    }
  | {
      id: InnFacilityIdEnum.SecurityCamera;
      name: InnFacilityNameEnum.SecurityCamera;
    }
  | {
      id: InnFacilityIdEnum.WorkSpace;
      name: InnFacilityNameEnum.WorkSpace;
    };
