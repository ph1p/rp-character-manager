import { FunctionComponent } from 'react';

interface Props {
  onClose: () => void;
  color: string;
}

export const Notification: FunctionComponent<Props> = (props) => {
  return (
    <div
      className={`text-white px-6 py-4 border-0 rounded relative mb-4 bg-${props.color}-500 text-sm`}
    >
      <span className="inline-block align-middle mr-8">{props.children}</span>
      <button
        className="absolute bg-transparent text-xl font-semibold leading-none right-0 top-0 mt-4 mr-5 outline-none focus:outline-none"
        onClick={() => props.onClose()}
      >
        <span>×</span>
      </button>
    </div>
  );
};
