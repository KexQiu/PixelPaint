import type { FC } from 'react';

import ColorPicker from '@/components/ColorPicker';
import useColor from '@/hooks/useColor';
import { colorResultToHexString } from '@/utils/color';

export const ToolBar: FC = () => {
  const { currentColor, setColor } = useColor();

  return (
    <div className="w-16 h-full shadow  bg-#333 flex flex-col items-center py-6 relative z-50">
      <ColorPicker initialColor={colorResultToHexString(currentColor)} onChange={setColor} />
    </div>
  );
};

export default ToolBar;
