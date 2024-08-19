import { atom } from 'jotai';
import type { ColorResult, Config, ColorConfig } from '@/types';
import { Application } from 'pixi.js';

/**
 * 画板主体
 */
export const appAtom = atom<Application>();

/**
 * 配置
 */
export const config = atom<Config>();

/**
 * 颜色配置
 */
export const colorConfig = atom<ColorConfig>();

/**
 * 画板颜色矩阵
 */
export const colorMatrixAtom = atom<ColorResult[][]>();
export const operMatrixAtom = atom<ColorResult[][]>();

export interface History {
  matrix: ColorResult[][];
}

/**
 * 历史
 */
export const colorHistory = atom<{
  historyArray: History[];
  currentIndex?: number;
}>({
  historyArray: [],
  currentIndex: 0,
});
