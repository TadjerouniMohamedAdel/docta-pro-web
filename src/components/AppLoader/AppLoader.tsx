import React from 'react';

const AppLoader: React.FC = () => {
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
      <video width={200} autoPlay muted loop src="/docta-loader.mp4" />
    </div>
  );
};

export default AppLoader;
