import React, { ReactNode } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

export type Props = TextAreaProps & {
  icon?: ReactNode;
};

const TextArea: React.FC<Props> = ({ icon, style, ...rest }) => {
  const { TextArea: AntdTextArea } = Input;
  return (
    <div style={{ position: 'relative' }}>
      <AntdTextArea
        rows={3}
        {...rest}
        style={{ paddingTop: 14, paddingLeft: icon ? 54 : 11, ...style }}
      />
      <div style={{ position: 'absolute', top: 10, left: 16 }}>{icon}</div>
    </div>
  );
};
export default TextArea;
