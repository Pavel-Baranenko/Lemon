import { Dispatch, SetStateAction } from 'react';
import Decimal from 'decimal.js';
import cn from 'classnames';
import Image from 'next/image';

interface NumberInputProps {
  className: string;
  size: number;
  step: number;
  min: number;
  max: number;
  state: [string, Dispatch<SetStateAction<string>>];
}

export default function NumberInput({
  state,
  className,
  size,
  step,
  min,
  max,
}: NumberInputProps) {
  const [value, setValue] = state;

  const isValidNumericInput = (inputValue: string) => {
    return /^\d*\.?\d*$/.test(inputValue);
  };

  const clampValue = (numericValue: Decimal): Decimal => {
    if (numericValue.lessThan(min)) {
      return new Decimal(min);
    } else if (numericValue.greaterThan(max)) {
      return new Decimal(max);
    }
    return numericValue;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    if (inputValue === '') {
      // Если поле ввода пустое, устанавливаем пустое значение в состояние
      setValue('');
      return;
    }

    if (isValidNumericInput(inputValue)) {
      let numericValue = new Decimal(inputValue);
      if (!numericValue.isNaN()) {
        numericValue = clampValue(numericValue);
        setValue(numericValue.toString());
      } else {
        setValue(inputValue);
      }
    }
  };

  const handleDecrement = () => {
    let numericValue = new Decimal(value || '0'); // Если значение пустое, считаем его как 0
    if (!numericValue.isNaN()) {
      numericValue = clampValue(numericValue.minus(step));
      setValue(numericValue.toString());
    }
  };

  const handleIncrement = () => {
    let numericValue = new Decimal(value || '0'); // Если значение пустое, считаем его как 0
    if (!numericValue.isNaN()) {
      numericValue = clampValue(numericValue.plus(step));
      setValue(numericValue.toString());
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (!isValidNumericInput(inputValue)) {
      event.currentTarget.value = value;
    }
  };

  return (
    <div className="input-group left-form-border">
      <div className="input-group-prepend">
        <button
          className={cn("btn btn-link px-2", { disabled: new Decimal(value || '0').lessThanOrEqualTo(min) })}
          onClick={handleDecrement}
        >
          <Image
            src="/img/minus.png"
            width={size}
            height={size}
            alt="Decrement"
          />
        </button>
      </div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onInput={handleInput}
        className={className}
        min={min}
        max={max}
        step={step}
        inputMode="numeric"
        pattern="^\d*\.?\d*$"
      />
      <div className="input-group-append">
        <button
          className={cn("btn btn-link px-2", { disabled: new Decimal(value || '0').greaterThanOrEqualTo(max) })}
          onClick={handleIncrement}
        >
          <Image
            src="/img/plus.png"
            width={size}
            height={size}
            alt="Increment"
          />
        </button>
      </div>
    </div>
  );
}
