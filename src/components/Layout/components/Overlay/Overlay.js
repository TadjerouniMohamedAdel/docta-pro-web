import React from 'react';
import { func } from 'prop-types';

const propTypes = {
  setToggled: func.isRequired,
};
const Overlay = ({ setToggled }) => {
  return (
    <div
      className="overlay"
      onClick={() => setToggled(false)}
      onKeyPress={() => setToggled(false)}
      role="button"
      tabIndex={0}
      aria-label="overlay"
    />
  );
};

Overlay.propTypes = propTypes;

export default Overlay;
