import { useId } from 'react'
import { clsx } from 'clsx'
import BaseLabel from '../BaseLabel';

interface propsType{
    label?: string;
    type?: string;
    error?: boolean;
    required?: boolean;
    disabled?: false;
    valid?: false;
    className?: string;
    errorText?: string;
    rounded?: string |null;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    id?: string;
    name?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    readOnly?: boolean;
    // ...rest?: [];
}

interface styleProps{
    base: string;
    state: {
        normal: string;
        error: string;
        valid: string;
        disabled: string;
    };
    rounded: {
        [key: string]: string | null;
    };
}

const TextArea = (props:propsType) => {
  
  const {
    label,
    error = false,
    required = false,
    disabled = false,
    valid = false,
    className = '',
    errorText = '',
    rounded = 'lg',
    value='',
    onChange=() => {},
    onBlur = () => {},
    onFocus = () => {},
    placeholder = '',
 
    name,
    autoComplete = '',
    autoFocus = false,
    maxLength,
    minLength,
    readOnly = false,
    ...rest
  } = props;

  const id = useId();

  const styles:styleProps = {
    base: 'border-gray-300 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700  shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent',
    state: {
      normal: 'placeholder-gray-400 border-gray-300 focus:ring-blue-600',
      error: 'border-red-600 focus:ring-red-600',
      valid: 'border-green-600 focus:ring-green-600',
      disabled: 'cursor-not-allowed bg-gray-100 shadow-inner text-gray-400'
    },
    rounded: {
      none: null,
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    }
  }

  return (
    <div className={clsx('relative', className)}>
      {label && (
        <BaseLabel id={id}>
          {label} {required && '*'}
        </BaseLabel>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        className={clsx([styles.base,
        rounded && styles.rounded[rounded],
        error ? styles.state.error : styles.state.normal,
        valid ? styles.state.valid : styles.state.normal,
        disabled && styles.state.disabled
        ])}
        disabled={disabled}
        required={required}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-600">{errorText}</p>}
    </div>
  )
}

export default TextArea;