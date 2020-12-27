import { FunctionComponent, InputHTMLAttributes, useRef } from 'react';

export const Checkbox: FunctionComponent<
  { label: string } & InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const id = useRef(`input-${Math.random() * 1000}`);

  return (
    <div className={props.className}>
      <label htmlFor={id.current} className="flex justify-start items-start">
        <div className="bg-white border-2 rounded border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <input
            {...props}
            id={id.current}
            type="checkbox"
            className="opacity-0 absolute"
          />
          <svg
            className="fill-current hidden w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <div className="select-none text-sm">{props.label}</div>
      </label>
    </div>
  );
};
