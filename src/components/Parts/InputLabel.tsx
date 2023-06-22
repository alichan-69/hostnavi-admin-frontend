export declare type InputLabelProps = {
  htmlFor?: string;
  label: string;
  isRequired?: boolean;
};

const InputLabel = function render({ htmlFor, label, isRequired }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span>{label}</span>
      <span className="text-warning">{isRequired && <>*</>}</span>
    </label>
  );
};

export default InputLabel;
