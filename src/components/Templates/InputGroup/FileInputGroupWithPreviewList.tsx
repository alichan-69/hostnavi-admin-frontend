import { FileInputGroup } from '.';
import type { FileInputGroupProps } from './FileInputGroup';
import type { MouseEventHandler } from 'react';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { MdCancel } from 'react-icons/md';
import { DefaultButton } from '../../Parts/Button';
import type { UseFormHandleSubmit, FieldValues, FieldError, Merge } from 'react-hook-form';
import InputValidateError from '../../Parts/InputValidateError';

const FileInputGroupWithPreviewList = function render({
  images,
  onClickPreviewDeleteButton,
  onClickRegisterImage,
  previewListErrors,
  ...props
}: {
  images: string[];
  onClickPreviewDeleteButton: MouseEventHandler<HTMLButtonElement>;
  onClickRegisterImage: () => void | Promise<any> | UseFormHandleSubmit<FieldValues>;
  previewListErrors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
} & FileInputGroupProps) {
  return (
    <>
      <FileInputGroup {...props} />
      <DefaultButton label="画像の追加" className="w-56" onClick={onClickRegisterImage} />
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div key={`preview-${index}`} className="relative hover:cursor-pointer">
            <IconButton className="absolute z-10 text-icon" onClick={onClickPreviewDeleteButton} id={`preview-button-${index}`}>
              <MdCancel />
            </IconButton>
            <Image width={224} height={224} alt="プレビュー" src={image} />
          </div>
        ))}
      </div>
      {previewListErrors && <InputValidateError errors={previewListErrors} />}
    </>
  );
};

export default FileInputGroupWithPreviewList;
