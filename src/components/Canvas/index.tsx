import { FC } from 'react';
import Render from './Render';

const Canvas: FC = () => {
  return (
    <div className="main-canvas w-full h-full">
      <Render />
    </div>
  );
};

export default Canvas;
