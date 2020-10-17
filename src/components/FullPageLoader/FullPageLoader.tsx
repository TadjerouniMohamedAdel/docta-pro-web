import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const FullPageLoader: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        zIndex: 1999,
      }}
    >
      <LoadingOutlined />
    </div>
  );
};

export default FullPageLoader;
