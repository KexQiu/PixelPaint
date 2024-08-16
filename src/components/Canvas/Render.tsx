import { useMemo, useRef, type FC } from 'react';
import usePixi from '@/hooks/usePixi';
import useColorsMatrix from '@/hooks/useColorsMatrix';
import Mask from './Mask';
import parseColor from '@/utils/parseColor';

import type { Config } from '@/types';
import usePaint from '@/hooks/usePaint';
import { useKeyPress } from 'ahooks';

// TODO 预设模拟值 后续做成配置
const config: Config = { width: 50, height: 40, quality: 20 };
const pickColors = ['#000', '#fff'];

const Render: FC = () => {
  const renderRef = useRef<HTMLDivElement | null>(null);

  const { app, changeScale, exportImage } = usePixi(renderRef, config);
  const { setOperColor, mergeToMain, undo, redo } = useColorsMatrix(config);
  const { calcPath, calcCoordinateInView, clearPrevCoordinate } =
    usePaint(config);

  const onMaskMouseMove = (event: MouseEvent) => {
    if (!app) return;

    const {clientX, clientY} = event

    const coordinate = calcCoordinateInView(clientX, clientY, app);
    if (!coordinate) return;

    const path = calcPath(coordinate);
    path.forEach(([x, y]) => {
      if (x < 0 || y < 0 || x >= config.width || y >= config.height) return;
      setOperColor(x, y, parseColor(pickColors[0]));
    });
  };

  const onScaleChange = (event: WheelEvent) => {
    if (!app) return;
    const mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    const viewRect = app.view.getBoundingClientRect?.();
    if (!viewRect) return;

    const encloseValue = (value: number) => {
      if (value > 100) {
        return 100;
      }
      if (value < 0) {
        return 0;
      }
      return value;
    };

    const mousePositionOnCanvas = {
      x:
        encloseValue(((mousePosition.x - viewRect.x) / viewRect.width) * 100) +
        '%',
      y:
        encloseValue(((mousePosition.y - viewRect.y) / viewRect.height) * 100) +
        '%',
    };

    changeScale(
      event.deltaY / 100,
      mousePositionOnCanvas.x,
      mousePositionOnCanvas.y
    );
  };

  const onOneStepDown = () => {
    clearPrevCoordinate();
    mergeToMain();
  };

    // 快捷键
  // 判断系统
  const isMac = useMemo(() => {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  }, []);
  useKeyPress([isMac ? 'meta.z' : 'ctrl.z'], undo, {
    events: ['keydown'],
    exactMatch: true,
  });
  useKeyPress([isMac ? 'meta.shift.z' : 'ctrl.shift.z'], redo);
  useKeyPress([isMac ? 'meta.s' : 'ctrl.s'], (event) => {
    event.preventDefault();
    exportImage();
  });

  return (
    <div className="contain w-full h-full relative">
      <Mask
        onMouseMove={onMaskMouseMove}
        onScaleChange={onScaleChange}
        onOneStepDown={onOneStepDown}
      />
      <div
        className="render w-full h-full flex items-center justify-center relative overflow-auto"
        ref={renderRef}
      ></div>
    </div>
  );
};

export default Render;
