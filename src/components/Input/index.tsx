import { ComponentProps, type FC, useState, ChangeEvent } from 'react';

interface InputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label?: string;
  max?: number;
  min?: number;
  onChange?: (e: number | string) => void;
}

export const Input: FC<InputProps> = ({ label, name, type, onChange, max, min, ...restProps }) => {
  const [value, setValue] = useState<number | string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const newValue = e.target.value;
      if (max && Number(newValue) > max) {
        setValue(max);
      } else if (min && Number(newValue) < min) {
        setValue(min);
      } else if (newValue === '' || /^[0-9]+$/.test(newValue)) {
        setValue(Number(newValue));
        onChange?.(Number(newValue));
      }
    } else {
      setValue(e.target.value);
      onChange?.(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-base mb-4">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        value={value}
        onChange={handleChange}
        {...restProps}
        className='bg-#555 border-none py-1 px-3 rounded-md text-lg text-white'
      />
    </div>
  );
};

export default Input;