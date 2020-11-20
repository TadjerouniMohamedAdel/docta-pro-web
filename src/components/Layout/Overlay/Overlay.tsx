import React from 'react';

type Props = {
  handleToggled: (value: boolean) => void;
};

const Overlay: React.FC<Props> = ({ handleToggled }) => {
  return (
    <div
      className="overlay"
      onClick={() => handleToggled(false)}
      onKeyPress={() => handleToggled(false)}
      role="button"
      tabIndex={0}
      aria-label="overlay"
    />
  );
};

export default Overlay;
