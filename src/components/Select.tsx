import { FunctionComponent, SelectHTMLAttributes, useRef } from 'react';

export const Select: FunctionComponent<
  { label?: string } & SelectHTMLAttributes<HTMLSelectElement>
> = (props) => {
  const id = useRef(`input-${Math.random() * 1000}`);

  return (
    <div className={props.className || 'w-full'}>
      {props.label && (
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={id.current}
        >
          {props.label}
        </label>
      )}
      <div className="relative">
        <svg
          className="w-5 h-5 absolute right-2 bottom-2 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <select
          {...props}
          defaultValue={props?.defaultValue?.toString()}
          className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-2 px-3 text-sm mb-3 leading-tight focus:outline-none focus:bg-white ${props.className}`}
          id={id.current}
        >
          {props.children}
        </select>
      </div>
    </div>
  );
};
