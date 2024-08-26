import { useAtom } from 'jotai';
import { colorMatrixAtom, operMatrixAtom, colorHistory } from '@/states';
import { useMemo } from 'react';
import type { ColorResult } from '@/types';
import { cloneDeep } from 'lodash';
import useConfig from '@/hooks/useConfig';

export const useColorsMatrix = () => {
  const { config } = useConfig();

  const [colorMatrix, setColorMatrix] = useAtom(colorMatrixAtom);
  const [operMatrix, setOperMatrix] = useAtom(operMatrixAtom);
  const [history, setColorHistory] = useAtom(colorHistory);

  const { rows, cols } = useMemo(() => {
    if (!config) return { rows: 0, cols: 0, quality: 0 };
    return {
      rows: config.height,
      cols: config.width,
    };
  }, [config]);

  const setHistory = (colorMatrix: ColorResult[][]) => {
    if (!colorMatrix) return;
    const { currentIndex, historyArray } = history;
    const current = {
      matrix: colorMatrix,
    };
    let newCurrentIndex = currentIndex;
    const newHistoryArray = [...historyArray];
    if (
      currentIndex !== undefined &&
      currentIndex !== newHistoryArray.length - 1
    ) {
      newHistoryArray.splice(currentIndex + 1);
    }
    newCurrentIndex = newHistoryArray.push(current) - 1;
    setColorHistory({
      historyArray: newHistoryArray,
      currentIndex: newCurrentIndex,
    });
  };

  const initialColorMatrix = (matrix: ColorResult[][]) => {
    setColorMatrix(matrix);
    setHistory(matrix);
  };

  // 撤回
  const undo = () => {
    history.currentIndex = Math.max(history.currentIndex! - 1, 0);
    setColorMatrix(history.historyArray[history.currentIndex].matrix);
    setColorHistory({
      ...history,
      currentIndex: history.currentIndex,
    });
  };
  // 重做
  const redo = () => {
    if (history.currentIndex === history.historyArray.length - 1) {
      return;
    }
    history.currentIndex = Math.min(
      history.currentIndex! + 1,
      history.historyArray.length - 1
    );
    setColorMatrix(history.historyArray[history.currentIndex].matrix);
  };

  // 合并到主体层
  const mergeToMain = () => {
    if (!colorMatrix || !operMatrix) return;
    const newColorMatrix = cloneDeep(colorMatrix);
    let isChange = false;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          operMatrix[row][col].alpha === 0 ||
          JSON.stringify(operMatrix[row][col]) ===
            JSON.stringify(colorMatrix[row][col])
        )
          continue;
        newColorMatrix[row][col] = operMatrix[row][col];
        isChange = true;
      }
    }
    if (isChange === false) return;
    setColorMatrix(newColorMatrix);
    clearOperMatrix();
    setHistory(newColorMatrix);
  };

  // 清空矩阵
  const clearOperMatrix = () => {
    if (!operMatrix) return;
    const newOperMatrix = cloneDeep(operMatrix);
    for (let row = 0; row < operMatrix.length; row++) {
      for (let col = 0; col < operMatrix[row].length; col++) {
        newOperMatrix[row][col] = {
          color: 0xffffff,
          alpha: 0,
        };
      }
    }
    setOperMatrix(newOperMatrix);
  };

  const setOperColor = (col: number, row: number, color: ColorResult) => {
    setOperMatrix(prev => {
      const newMatrix = cloneDeep(prev);
      newMatrix![row][col] = color;
      return newMatrix;
    });
  };

  return {
    colorMatrix,
    setColorMatrix,
    initialColorMatrix,
    operMatrix,
    setOperMatrix,
    setOperColor,
    mergeToMain,
    undo,
    redo,
  };
};

export default useColorsMatrix;
