import {
  FunctionComponent,
  useRef,
  SyntheticEvent,
  PropsWithChildren,
} from 'react';

interface ModalProps {
  onClose: () => void;
  open: boolean;
  className?: string;
}

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = (
  props: PropsWithChildren<ModalProps>
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return props.open ? (
    <div
      ref={wrapperRef}
      className="fixed z-40 w-full h-full flex bg-opacity-50 bg-black left-0 top-0"
      onClick={(e: SyntheticEvent) => {
        if (wrapperRef.current === e.target) {
          props.onClose();
        }
      }}
    >
      <div
        className={`bg-white p-5 mx-auto self-center rounded-md ${
          props.className || ''
        }`}
      >
        {props.children}
      </div>
    </div>
  ) : null;
};
