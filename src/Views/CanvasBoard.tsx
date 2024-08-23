import type { FC } from 'react';
import { Canvas } from '@/components';
import useConfig from '@/hooks/useConfig';

export const CanvasBoard: FC = () => {
  const { config } = useConfig();
  return <div className='w-full h-full'>
    {config && <Canvas />}
  </div>;
};

export default CanvasBoard;
