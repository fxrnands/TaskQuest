interface Props {
  placeholder: string;
  className: string;
  type: string;
  value?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}
const Input = ({
  placeholder,
  className,
  name,
  type,
  value,
  onChange,
  id,
}: Props) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
