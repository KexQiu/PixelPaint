import React, { useRef, useState } from 'react';
import { ColorPicker, useColor, IColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useClickAway } from 'ahooks';

interface ColorPickerProps {
  initialColor?: string;
  onChange?: (color: string) => void;
}

const CustomColorPicker: React.FC<ColorPickerProps> = ({
  initialColor = '#000000',
  onChange,
}) => {
  const [color, setColor] = useColor(initialColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const presetColors = [
    '#D0021B',
    '#F5A623',
    '#F8E71C',
    '#8B572A',
    '#7ED321',
    '#417505',
    '#BD10E0',
    '#9013FE',
    '#4A90E2',
    '#50E3C2',
    '#B8E986',
    '#000000',
    '#4A4A4A',
    '#9B9B9B',
    '#FFFFFF',
  ];

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const popoverRef = useRef(null);
  const showRef = useRef(null);
  useClickAway(() => {
    handleClose();
  }, [popoverRef, showRef]);

  const handleChange = (newColor: IColor) => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor.hex);
    }
  };

  const handlePresetColorClick = (presetColor: string) => {
    const newColor = {
      hex: presetColor,
      rgb: { r: 0, g: 0, b: 0, a: 1 },
      hsv: { h: 0, s: 0, v: 0, a: 1 },
    };
    setColor(newColor);
    if (onChange) {
      onChange(presetColor);
    }
  };

  return (
    <div>
      <div
        className="w-8 h-8 rounded-md shadow-md cursor-pointer overflow-hidden border-2 border-white border-solid"
        onClick={handleClick}
        ref={showRef}
      >
        <div className="w-full h-full" style={{ background: color.hex }} />
      </div>
      {displayColorPicker ? (
        <div className="absolute z-10 mt-2 w-90" ref={popoverRef}>
          <div className="bg-#121212 rounded-2xl p-2 shadow-lg">
            <ColorPicker color={color} onChange={handleChange} />
            <div className="mt-2 flex flex-wrap justify-center">
              {presetColors.map(presetColor => (
                <div
                  key={presetColor}
                  className="w-8 aspect-square m-1 rounded-full cursor-pointer border border-gray-600 border-solid hover:border-white transition-colors duration-200"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handlePresetColorClick(presetColor)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomColorPicker;
