import { useEffect, useRef, useState } from 'react';
import { Application, Container, Graphics } from 'pixi.js';

import type { Config } from '@/types';
import useColorsMatrix from '@/hooks/useColorsMatrix';
import { useDebounceFn } from 'ahooks';

import { renderMatrix } from './utils';
import { useAtom } from 'jotai';
import { appAtom } from '@/states';

export default function usePixi(
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  config: Config
) {
  const [app, setApp] = useAtom(appAtom);

  // 初始缩放值
  const initialScaleValue = useRef<number>();

  // 定义色彩矩阵
  const backgroundContainer = useRef<Container>();
  const mainContainer = useRef<Container>();
  const pixels = useRef<Array<Array<Graphics>>>();
  const operContainer = useRef<Container>();
  const operPixels = useRef<Array<Array<Graphics>>>();
  const { colorMatrix, initialColorMatrix, operMatrix, setOperMatrix } =
    useColorsMatrix(config);

  useEffect(() => {
    if (!config || !app || !app.view) return;
    const { width, height, quality } = config;
    const colorGrid: number[][] = [];

    for (let row = 0; row < height; row++) {
      colorGrid[row] = [];
      for (let col = 0; col < width; col++) {
        // 根据行列的和决定颜色，白色和黑色交替
        colorGrid[row][col] = (row + col) % 2 === 0 ? 0xffffff : 0xeeeeee; // 白色和黑色
      }
    }

    const bgContainer = new Container();
    bgContainer.name = 'backgroundContainer';
    const container = new Container();
    container.name = 'mainContainer';
    const oContainer = new Container();
    oContainer.name = 'operationContainer';
    const pixelArray = [];
    const operPixelArray = [];
    const colors = [];
    // 根据配置进行遍历
    for (let row = 0; row < height; row++) {
      const arr = [];
      const operArr = [];
      const cArr = [];
      for (let col = 0; col < width; col++) {
        const x = col * quality;
        const y = row * quality;
        // 背景
        const cell = new Graphics();
        // 绘制初始格子
        cell.beginFill(colorGrid[row][col]);
        cell.drawRect(x, y, quality, quality);
        cell.endFill();
        // 将格子添加到Container
        bgContainer.addChild?.(cell);

        // 主体层
        const pixel = new Graphics();
        // 绘制初始格子
        cArr.push({ color: 0x000000, alpha: 0 });
        pixel.beginFill(0x000000, 0);
        pixel.drawRect(x, y, quality, quality);
        pixel.endFill();

        // 将格子添加到舞台
        container.addChild?.(pixel);
        arr.push(pixel); // 存储格子的引用

        // 操作层
        const operPixel = new Graphics();
        // 绘制初始格子
        operPixel.beginFill(0x000000, 0);
        operPixel.drawRect(x, y, quality, quality);
        operPixel.endFill();

        // 将格子添加到舞台
        oContainer.addChild?.(operPixel);
        operArr.push(operPixel); // 存储格子的引用
      }
      pixelArray.push(arr);
      colors.push(cArr);
      operPixelArray.push(operArr);
    }
    app.stage.addChild(bgContainer);
    app.stage.addChild(container);
    app.stage.addChild(oContainer);
    backgroundContainer.current = bgContainer;
    mainContainer.current = container;
    operContainer.current = oContainer;

    pixels.current = pixelArray;
    operPixels.current = operPixelArray;
    initialColorMatrix(colors);
    setOperMatrix(colors);
  }, [config, app]);
  // 监听操作颜色矩阵进行绘制
  useEffect(() => {
    if (operMatrix && operPixels.current)
      renderMatrix(operMatrix, operPixels!.current, config);
  }, [operMatrix]);
  // 监听颜色矩阵进行绘制
  useEffect(() => {
    if (colorMatrix && pixels.current)
      renderMatrix(colorMatrix, pixels!.current, config);
  }, [colorMatrix]);

  // 缩放
  const [scaleValue, setScaleValue] = useState(1);
  const [scaleOrigin, setScaleOrigin] = useState({
    originX: '50%',
    originY: '50%',
  });
  const { run: deBounceSetScaleOrigin } = useDebounceFn(setScaleOrigin, {
    leading: true,
    trailing: false,
    wait: 500,
  });
  const changeScale = (
    scaleChangeValue: number,
    originX: string,
    originY: string
  ) => {
    const value = scaleValue + scaleChangeValue;
    if (value < 0.05 || value > 5) return;
    setScaleValue(value);
    deBounceSetScaleOrigin({
      originX,
      originY,
    });
  };
  const resetScale = () => {
    setScaleValue(initialScaleValue.current!);
    deBounceSetScaleOrigin({
      originX: '50%',
      originY: '50%',
    });
  };

  // 初始化画布
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height, quality } = config;

    const app = new Application({
      width: width * quality,
      height: height * quality,
      backgroundColor: '#ffffff',
    });

    const view = app.view as HTMLCanvasElement;

    const { height: containerHeight, width: containerWidth } =
      containerRef.current.getBoundingClientRect();
    const ScaleValue = Math.min(
      (containerHeight * 0.8) / (height * quality),
      (containerWidth * 0.8) / (width * quality)
    );
    setScaleValue(ScaleValue);
    initialScaleValue.current = ScaleValue;

    containerRef.current?.appendChild(view);

    setApp(app);

    return () => {
      setApp(undefined);
      try {
        containerRef.current?.removeChild(view);
      } catch (e) {
        console.log(e);
      }
      try {
        app.destroy(true);
      } catch (e) {
        console.log(e);
      }
    };
  }, [config, containerRef]);

  // 监听scale变化
  useEffect(() => {
    if (!app || !app.view) return;
    const view = app.view as HTMLCanvasElement;
    view.style.transformOrigin =
      scaleOrigin.originX + ' ' + scaleOrigin.originY;
    view.style.transform = `scale(${scaleValue})`;
  }, [app, scaleOrigin, scaleValue]);

  return { app, changeScale, resetScale };
}