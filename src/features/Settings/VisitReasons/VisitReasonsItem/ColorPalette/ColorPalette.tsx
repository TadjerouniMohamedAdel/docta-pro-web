import React from 'react';

type Props = {
  onSelectColor: (color: string) => void;
  selectedColor: string;
};

const ColorPalette: React.FC<Props> = ({ onSelectColor }) => {
  const colors = [
    'red',
    'lipstick',
    'tomato-red',
    'salmon',
    'reddish-orange',
    'orange',
    'tangerine',
    'macaroni-and-cheese',
    'macaroni-and-cheese-two',
    'sick-green',
    'green-apple',
    'greenish-teal',
    'jungle-green',
    'teal',
    'azure',
    'dodger-blue',
    'french-blue',
    'soft-blue',
    'dark-lilac',
    'purple',
    'dark-taupe',
    'brownish-grey',
    'stone',
  ];

  const handleClick = (color: string) => {
    onSelectColor(color);
  };

  return (
    <div className="color-palette" style={{ width: 180 }}>
      {colors.map((color) => (
        <div
          key={color}
          style={{ margin: 5, display: 'inline-block' }}
          className={`reason-color ${color}`}
          onClick={() => handleClick(color)}
          onKeyDown={() => handleClick(color)}
          role="button"
          tabIndex={0}
        >
          {/* {selectedColor === color ? <Icon name="user-line" /> : null} */}
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
