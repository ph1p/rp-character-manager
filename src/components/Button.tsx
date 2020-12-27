import { ButtonHTMLAttributes, FunctionComponent, useMemo } from 'react';

interface ButtonProps {
  large?: boolean;
  small?: boolean;
  filled?: boolean;
  full?: boolean;
  className?: string;
}

export const Button: FunctionComponent<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { large, filled, color, full, small, ...rest } = props;

  const classes = useMemo(() => {
    const classList = [];

    if (props.large) {
      classList.push('text-md');
      classList.push('px-3');
      classList.push('py-1');
    } else if (props.small) {
      classList.push('text-xs');
      classList.push('px-2');
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
      classList.push(`hover:bg-${props.color || 'gray'}-600`);
    } else {
      classList.push('border');
      classList.push(`border-${props.color || 'gray'}-500`);
      classList.push(`text-${props.color || 'gray'}-500`);
      classList.push(`hover:bg-${props.color || 'gray'}-100`);
    }

    return classList.join(' ');
  }, [props.color, props.filled, props.large, props.full, props.small]);

  return (
    <button
      {...rest}
      className={`${classes} rounded block focus:outline-none ${props.className}`}
    >
      {props.children}
    </button>
  );
};
