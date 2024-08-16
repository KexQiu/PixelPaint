import type { FC } from 'react';
import { Canvas } from '@/components';

export const CanvasBoard: FC = () => {
  return <div className='w-full h-full'>
    <Canvas />
  </div>;
};

export default CanvasBoard;
