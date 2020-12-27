import { FunctionComponent } from 'react';

export const ContentBox: FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => (
  <div className={`bg-white p-5 rounded-md ${props.className || ''}`}>
    {props.children}
  </div>
);
