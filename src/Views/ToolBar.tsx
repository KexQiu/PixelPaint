import type { FC } from 'react';

import ColorPicker from '@/components/ColorPicker';

export const ToolBar: FC = () => {
  return <div className="w-16 h-full shadow  bg-#333 flex flex-col items-center py-6">
    <ColorPicker />
  </div>;
};

export default ToolBar;
