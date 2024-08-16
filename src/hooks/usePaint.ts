import { Application } from 'pixi.js';
import type { Config, Coordinate } from '@/types';
import { useRef } from 'react';
// 用于输出画笔路径
const usePaint = (config: Config) => {
  const calcCoordinateInView: (
    clientX: number,
    clientY: number,
    app: Application
  ) => Coordinate | undefined = (clientX, clientY, app) => {
    if (!app) return;

    const viewRect = app.view.getBoundingClientRect?.();
    if (!viewRect) return;

    const x = clientX - viewRect.x;
    const y = clientY - viewRect.y;

    return [
      Math.floor((x / viewRect.width) * config.width),
      Math.floor((y / viewRect.height) * config.height),
    ];
  };

  const prevCoordinate = useRef<Coordinate>();
  const calcPath: (coordinate: Coordinate) => [number, number][] = ([x, y]) => {
    if (!prevCoordinate.current) {
      prevCoordinate.current = [x, y];
      return [[x, y]];
    }
    const coordinates = [];
    let x0 = prevCoordinate.current[0];
    let y0 = prevCoordinate.current[1];
    const dx = Math.abs(x - x0);
    const dy = Math.abs(y - y0);
    const sx = x0 < x ? 1 : -1; // x 方向的步进
    const sy = y0 < y ? 1 : -1; // y 方向的步进
    let err = dx - dy; // 误差值

    while (true) {
      coordinates.push([x0, y0] as [number, number]); // 将当前点加入结果数组
      if (x0 === x && y0 === y) break; // 如果到达终点，结束循环
      const err2 = err * 2; // 计算误差的两倍
      if (err2 > -dy) {
        err -= dy;
        x0 += sx; // 在 x 方向上移动
      }
      if (err2 < dx) {
        err += dx;
        y0 += sy; // 在 y 方向上移动
      }
    }
    prevCoordinate.current = [x, y];
    return coordinates;
  };

  const clearPrevCoordinate = () => {
    prevCoordinate.current = undefined;
  };

  return { calcPath, calcCoordinateInView, clearPrevCoordinate };
};

export default usePaint;
