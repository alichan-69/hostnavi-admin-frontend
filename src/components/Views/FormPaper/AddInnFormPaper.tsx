import { DefaultButton } from '../../Parts/Button';
import { TextFieldInputGroup, SelectInputGroup, CheckboxListInputGroup } from '../../Templates/InputGroup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Paper } from '@mui/material';
import type { InnInnRequestParam } from '../../../type/requestParam/innInn';
import {
  INN_NAME_IDENTIFIER_JAPANESE,
  INN_NAME_IDENTIFIER_ENGLISH,
  INN_DESCRIPTION_IDENTIFIER_JAPANESE,
  INN_DESCRIPTION_IDENTIFIER_ENGLISH,
  INN_IMAGE_IDENTIFIER_ENGLISH,
  INN_IMAGE_IDENTIFIER_JAPANESE,
  INN_IMAGES_IDENTIFIER_ENGLISH,
  INN_FEE_IDENTIFIER_JAPANESE,
  INN_FEE_IDENTIFIER_ENGLISH,
  INN_TYPE_IDENTIFIER_JAPANESE,
  INN_TYPE_IDENTIFIER_ENGLISH,
  INN_ADDRESS_IDENTIFIER_JAPANESE,
  INN_ADDRESS_IDENTIFIER_ENGLISH,
  ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH,
  ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE,
  BEDROOM_NUMBER_IDENTIFIER_JAPANESE,
  BEDROOM_NUMBER_IDENTIFIER_ENGLISH,
  BED_NUMBER_IDENTIFIER_JAPANESE,
  BED_NUMBER_IDENTIFIER_ENGLISH,
  BATHROOM_NUMBER_IDENTIFIER_JAPANESE,
  BATHROOM_NUMBER_IDENTIFIER_ENGLISH,
  AMENITY_IDENTIFIER_JAPANESE,
  AMENITY_IDENTIFIER_ENGLISH,
  FACILITY_IDENTIFIER_JAPANESE,
  FACILITY_IDENTIFIER_ENGLISH,
} from '../../../const/inn';
import { yupString, validateImage, validateImages, yupNumber } from '../../../utils/validation';
import { InnTypeIdEnum, InnTypeNameEnum, InnStatusIdEnum, InnAmenityNameEnum, InnFacilityNameEnum } from '../../../enum/inn';
import { useRequest } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';
import { createInn, createInnImage } from '../../../utils/api/innInn';
import { useState, MouseEventHandler, useRef, useEffect } from 'react';
import FileInputGroupWithPreviewList from '../../Templates/InputGroup/FileInputGroupWithPreviewList';
import type AvatarEditor from 'react-avatar-editor';
import type { ChangeEvent } from 'react';
import { resizeCanvas } from '../../../utils/image';

type IFormInput = {
  innName: InnInnRequestParam['name'];
  description: string;
  image: File | null;
  images: File[];
  fee: InnInnRequestParam['fee'];
  status: InnInnRequestParam['statusId'];
  type: InnInnRequestParam['typeId'];
  address: InnInnRequestParam['address'];
  guestNumber: InnInnRequestParam['guestNumber'];
  bedroomNumber: InnInnRequestParam['bedroomNumber'];
  bedNumber: InnInnRequestParam['bedNumber'];
  bathroomNumber: InnInnRequestParam['bathroomNumber'];
  amenityIdList: InnInnRequestParam['amenityIdList'];
  facilityIdList: InnInnRequestParam['facilityIdList'];
};

const SCHEMA = yup.object().shape({
  innName: yupString(INN_ADDRESS_IDENTIFIER_JAPANESE, 64),
  description: yupString(INN_DESCRIPTION_IDENTIFIER_JAPANESE, 255),
  fee: yupNumber(INN_FEE_IDENTIFIER_JAPANESE, 999999, '円'),
  address: yupString(INN_ADDRESS_IDENTIFIER_JAPANESE, 255),
  guestNumber: yupNumber(ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE, 99, '人'),
  bedNumber: yupNumber(BEDROOM_NUMBER_IDENTIFIER_JAPANESE, 99, '個'),
  bedroomNumber: yupNumber(BED_NUMBER_IDENTIFIER_JAPANESE, 99, '個'),
  bathroomNumber: yupNumber(BATHROOM_NUMBER_IDENTIFIER_JAPANESE, 99, '個'),
});

export const AddInnFormPaper = () => {
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [amenityCheckedList, setAmenityCheckedList] = useState(new Array(Object.keys(InnAmenityNameEnum).length).fill(false));
  const [facilityCheckedList, setFacilityCheckedList] = useState(new Array(Object.keys(InnFacilityNameEnum).length).fill(false));

  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const editorRef = useRef<AvatarEditor>(null);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(SCHEMA),
    criteriaMode: 'all',
    shouldFocusError: true,
    defaultValues: {
      innName: '',
      description: '',
      fee: 0,
      type: InnTypeIdEnum.DetachedHouse,
      address: '',
      guestNumber: 0,
      bedNumber: 0,
      bedroomNumber: 0,
      bathroomNumber: 0,
    },
  });

  const handleChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files[0]) {
      const inputFile = event.target.files[0];

      // ファイルのバリデーション処理
      const errorMessage = validateImage(inputFile);
      if (errorMessage) {
        setError(INN_IMAGE_IDENTIFIER_ENGLISH, { message: errorMessage });
        return;
      }

      setImageFile(inputFile);
      setImage(URL.createObjectURL(inputFile));
    }
  };

  const handleClickRegisterImage = async () => {
    if (editorRef.current && imageFile) {
      // トリミングした画像のcanvasを指定した幅と高さでリサイズする
      const canvas = resizeCanvas(editorRef.current.getImage(), 500, 500);

      // トリミングした画像のURLを取得してプレビューリストに格納する処理
      const croppedFileURL = canvas.toDataURL();
      setImages([...images, croppedFileURL]);

      // トリミングした画像のファイルを一覧に格納する処理
      const result = await fetch(croppedFileURL);
      const blob = await result.blob();
      const newFile = new File([blob], imageFile.name, { type: imageFile.type });

      setImageFiles([...imageFiles, newFile]);
    }
  };

  const handleClickPreviewDeleteButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    // クリックした削除ボタンが付随するプレビューのidから削除する画像のプレビューリスト内でのインデックスを取得する処理
    const deletedId = Number(event.currentTarget.getAttribute('id')?.substring(15));

    // プレビューリストから画像を削除する処理
    images.splice(deletedId, 1);
    imageFiles.splice(deletedId, 1);
    setImages([...images]);
    setImageFiles([...imageFiles]);
  };

  const handleClickAmenityCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setAmenityCheckedList(amenityCheckedList.map((checked, index) => (index === Number(event.target.name) ? !checked : checked)));
  };

  const handleClickFacilityCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setFacilityCheckedList(facilityCheckedList.map((checked, index) => (index === Number(event.target.name) ? !checked : checked)));
  };

  const createInnWrapper = async (data: IFormInput) => {
    if (!userId) throw new Error();

    const amenityIdList = amenityCheckedList.reduce((newArray, checked, index) => {
      if (checked) {
        newArray.push(index + 1);
      }
      return newArray;
    }, []);
    const facilityIdList = facilityCheckedList.reduce((newArray, checked, index) => {
      if (checked) {
        newArray.push(index + 1);
      }
      return newArray;
    }, []);

    // 宿泊施設の登録
    const response = await createInn({
      userId,
      name: data.innName,
      description: data.description || null,
      fee: data.fee,
      statusId: InnStatusIdEnum.Published,
      typeId: data.type,
      address: data.address,
      guestNumber: data.guestNumber,
      bedroomNumber: data.bedroomNumber,
      bedNumber: data.bedNumber,
      bathroomNumber: data.bathroomNumber,
      amenityIdList,
      facilityIdList,
    });

    // 宿泊施設の画像の登録
    const formData = new FormData();
    imageFiles.map((imageFile) => {
      formData.append('images', imageFile);
    });
    await createInnImage(response.id, formData);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // react-hook-formで管理している以外のformでエラーが発生していたら設定して表示する処理
    if (Object.keys(errors).length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(errors).map((error: keyof IFormInput) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setError(error, errors[error]);
      });
      return;
    }

    loadingRequest(createInnWrapper(data), '登録中', '登録完了', '登録中にエラーが発生しました');
  };

  useEffect(() => {
    // 画像一覧のバリデーション処理
    const errorMessage = validateImages(imageFiles);
    if (errorMessage) {
      setError(INN_IMAGES_IDENTIFIER_ENGLISH, { message: errorMessage });
      return;
    } else {
      clearErrors(INN_IMAGES_IDENTIFIER_ENGLISH);
    }
  }, [imageFiles]);

  return (
    <>
      <Paper className="p-5">
        <form className="children:mb-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name={INN_NAME_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={INN_NAME_IDENTIFIER_ENGLISH}
                label={INN_NAME_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[INN_NAME_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={INN_DESCRIPTION_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={false}
                name={INN_DESCRIPTION_IDENTIFIER_ENGLISH}
                label={INN_DESCRIPTION_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[INN_DESCRIPTION_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <FileInputGroupWithPreviewList
            name={INN_IMAGE_IDENTIFIER_ENGLISH}
            label={INN_IMAGE_IDENTIFIER_JAPANESE}
            onChangeInput={handleChangeInputFile}
            onClickAvatorEditorDeleteButton={() => {
              setImage('');
            }}
            avatarEditorImage={image}
            avatarEditorRef={editorRef}
            images={images}
            onClickPreviewDeleteButton={handleClickPreviewDeleteButton}
            onClickRegisterImage={handleClickRegisterImage}
            avatarEditorErrors={errors[INN_IMAGE_IDENTIFIER_ENGLISH]}
            previewListErrors={errors[INN_IMAGES_IDENTIFIER_ENGLISH]}
            isRequired={true}
          />
          <Controller
            control={control}
            name={INN_FEE_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={INN_FEE_IDENTIFIER_ENGLISH}
                label={INN_FEE_IDENTIFIER_JAPANESE}
                value={value}
                type="number"
                fullWidth={true}
                endAdornment="円"
                errors={errors[INN_FEE_IDENTIFIER_ENGLISH]}
                onChange={onChange}
                inputProps={{ min: 0 }}
              />
            )}
          />
          <Controller
            control={control}
            name={INN_TYPE_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <SelectInputGroup
                selectRef={ref}
                isRequired={true}
                name={INN_TYPE_IDENTIFIER_ENGLISH}
                label={INN_TYPE_IDENTIFIER_JAPANESE}
                value={value}
                menuItems={[
                  {
                    label: InnTypeNameEnum.DetachedHouse,
                    value: InnTypeIdEnum.DetachedHouse,
                  },
                  {
                    label: InnTypeNameEnum.PrivateRoom,
                    value: InnTypeIdEnum.PrivateRoom,
                  },
                  {
                    label: InnTypeNameEnum.SharedRomm,
                    value: InnTypeIdEnum.SharedRoom,
                  },
                ]}
                selectClassName="w-full"
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={INN_ADDRESS_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={INN_ADDRESS_IDENTIFIER_ENGLISH}
                label={INN_ADDRESS_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[INN_ADDRESS_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH}
                label={ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE}
                value={value}
                type="number"
                endAdornment="人"
                fullWidth={true}
                errors={errors[ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH]}
                onChange={onChange}
                inputProps={{ min: 0 }}
              />
            )}
          />
          <Controller
            control={control}
            name={BEDROOM_NUMBER_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={BEDROOM_NUMBER_IDENTIFIER_ENGLISH}
                label={BEDROOM_NUMBER_IDENTIFIER_JAPANESE}
                value={value}
                type="number"
                endAdornment="個"
                fullWidth={true}
                errors={errors[BEDROOM_NUMBER_IDENTIFIER_ENGLISH]}
                onChange={onChange}
                inputProps={{ min: 0 }}
              />
            )}
          />
          <Controller
            control={control}
            name={BED_NUMBER_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={BED_NUMBER_IDENTIFIER_ENGLISH}
                label={BED_NUMBER_IDENTIFIER_JAPANESE}
                value={value}
                type="number"
                endAdornment="個"
                fullWidth={true}
                errors={errors[BED_NUMBER_IDENTIFIER_ENGLISH]}
                onChange={onChange}
                inputProps={{ min: 0 }}
              />
            )}
          />
          <Controller
            control={control}
            name={BATHROOM_NUMBER_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={BATHROOM_NUMBER_IDENTIFIER_ENGLISH}
                label={BATHROOM_NUMBER_IDENTIFIER_JAPANESE}
                value={value}
                type="number"
                endAdornment="個"
                fullWidth={true}
                errors={errors[BATHROOM_NUMBER_IDENTIFIER_ENGLISH]}
                onChange={onChange}
                inputProps={{ min: 0 }}
              />
            )}
          />
          <CheckboxListInputGroup
            label={AMENITY_IDENTIFIER_JAPANESE}
            name={AMENITY_IDENTIFIER_ENGLISH}
            checkedList={amenityCheckedList}
            labels={Object.values(InnAmenityNameEnum)}
            onChange={handleClickAmenityCheckbox}
          />
          <CheckboxListInputGroup
            label={FACILITY_IDENTIFIER_JAPANESE}
            name={FACILITY_IDENTIFIER_ENGLISH}
            checkedList={facilityCheckedList}
            labels={Object.values(InnFacilityNameEnum)}
            onChange={handleClickFacilityCheckbox}
          />
          <DefaultButton fullWidth={true} label="登録" type="submit" />
        </form>
      </Paper>
    </>
  );
};

export default AddInnFormPaper;
