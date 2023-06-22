import DashedBox from '../../Parts/DashedBox';
import type { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import type { MouseEventHandler, LegacyRef } from 'react';
import InputValidateError from '../../Parts/InputValidateError';
import { MdCancel } from 'react-icons/md';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';
import { useState } from 'react';
import type { TextFieldOnChange } from '../../Parts/DefaultTextField';
import InputLabel from '../../Parts/InputLabel';

export type FileInputGroupProps = {
  name: string;
  label?: string;
  avatarEditorErrors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  avatarEditorRef: LegacyRef<AvatarEditor> | undefined;
  avatarEditorImage: string;
  value?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChangeInput: TextFieldOnChange;
  onClickAvatorEditorDeleteButton: MouseEventHandler<HTMLButtonElement>;
  isRequired?: boolean;
};

const FileInputGroup = function render({
  name,
  label,
  avatarEditorErrors,
  avatarEditorImage,
  avatarEditorRef,
  value,
  inputRef,
  onChangeInput,
  onClickAvatorEditorDeleteButton,
  isRequired = false,
}: FileInputGroupProps) {
  const [scale, setScale] = useState(1);

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    if (typeof value === 'number') setScale(value);
  };

  return (
    <div className="children:mb-2">
      {label && <InputLabel htmlFor={name} label={label} isRequired={isRequired} />}
      <button type="button" className="flex text-icon" onClick={onClickAvatorEditorDeleteButton}>
        <MdCancel size={22} />
        <span className="text-16">画像を削除する</span>
      </button>
      <label className="block" htmlFor={name}>
        <div className="hover:cursor-pointer">
          {avatarEditorImage ? (
            <>
              <AvatarEditor className="h-56 w-56" ref={avatarEditorRef} image={avatarEditorImage} scale={scale} />
              <Slider value={scale} className="w-56" step={0.01} min={0} max={2} onChange={handleSliderChange} />
            </>
          ) : (
            <>
              <DashedBox className="relative h-56 w-56">
                <span className="absolute top-24 left-10 font-bold">画像をアップロード</span>
              </DashedBox>
              <input
                id={name}
                className="hidden"
                type="file"
                name={name}
                value={value}
                accept=".png, jpg, .jpeg"
                onChange={onChangeInput}
                ref={inputRef}
              />
            </>
          )}
        </div>
      </label>
      {avatarEditorErrors && <InputValidateError errors={avatarEditorErrors} />}
    </div>
  );
};

export default FileInputGroup;
