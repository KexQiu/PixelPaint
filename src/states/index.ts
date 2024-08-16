import { atom } from 'jotai';
import type { ColorResult } from '@/types';

/**
 * 颜色配置
 */
export const colorMatrixAtom = atom<ColorResult[][]>();
export const operMatrixAtom = atom<ColorResult[][]>();

export interface History {
  matrix: ColorResult[][];
}

// 历史
export const colorHistory = atom<{
  historyArray: History[];
  currentIndex?: number;
}>({
  historyArray: [],
  currentIndex: 0,
});
