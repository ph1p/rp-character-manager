import { FunctionComponent, InputHTMLAttributes, useRef } from 'react';

export const Input: FunctionComponent<
  { label?: string } & InputHTMLAttributes<HTMLInputElement>
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
      <input
        {...props}
        defaultValue={props?.defaultValue?.toString()}
        className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-2 px-3 text-sm mb-3 leading-tight focus:outline-none focus:bg-white`}
        id={id.current}
      />
    </div>
  );
};
