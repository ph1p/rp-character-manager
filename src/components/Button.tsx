import { ButtonHTMLAttributes, FunctionComponent, useMemo } from 'react';

interface ButtonProps {
  large?: boolean;
  filled?: boolean;
  full?: boolean;
  className?: string;
}

export const Button: FunctionComponent<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { large, filled, color, full, ...rest } = props;

  const classes = useMemo(() => {
    const classList = [];

    if (props.large) {
      classList.push('text-md');
      classList.push('px-3');
      classList.push('py-1');
    } else {
      classList.push('text-sm');
      classList.push('px-3');
      classList.push('py-2');
    }

    if (props.full) {
      classList.push('w-full');
    }

    if (props.filled) {
      classList.push(`bg-${props.color || 'gray'}-500`);
      classList.push(`text-white`);
    } else {
      classList.push('border');
      classList.push(`border-${props.color || 'gray'}-500`);
      classList.push(`text-${props.color || 'gray'}-500`);
    }

    return classList.join(' ');
  }, [props.color, props.filled, props.large, props.full]);

  return (
    <button
      {...rest}
      className={`${classes} rounded block min ${props.className}`}
    >
      {props.children}
    </button>
  );
};
