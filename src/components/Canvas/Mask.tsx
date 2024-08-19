import { useEventListener, useKeyPress } from 'ahooks';
import { useRef, type FC } from 'react';

interface MaskProps {
  onMouseMove: (event: MouseEvent) => void;
  onScaleChange: (event: WheelEvent) => void;
  onOneStepDown: () => void;
}

export const Mask: FC<MaskProps> = ({ onMouseMove, onScaleChange, onOneStepDown }) => {
  const maskRef = useRef<HTMLDivElement>(null);

  const isMouseDown = useRef<boolean>(false);
  useEventListener('mousedown', event => {
    event.stopPropagation();
    if (event.target === maskRef.current) {
      onMouseMove(event);
      isMouseDown.current = true;
    }
  });
  useEventListener('mouseup', event => {
    event.stopPropagation();
    if (event.target === maskRef.current) {
      isMouseDown.current = false;
      onOneStepDown();
    }
  });
  useEventListener('mousemove', event => {
    event.stopPropagation();
    if (event.target === maskRef.current) {
      if (!isMouseDown.current) return;
      onMouseMove(event);
    }
  });

  const isPressCtrl = useRef<boolean>(false);
  useKeyPress(
    ['ctrl'],
    event => {
      isPressCtrl.current = event.ctrlKey;
    },
    {
      events: ['keydown', 'keyup'],
    }
  );
  useEventListener('wheel', event => {
    event.stopPropagation();
    if (!isPressCtrl.current) return;
    onScaleChange(event);
  });

  return (
    <div
      className="mask absolute top-0 left-0 w-full h-full z-10"
      ref={maskRef}
    ></div>
  );
};

export default Mask;
