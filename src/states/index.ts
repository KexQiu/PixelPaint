import { atom } from 'jotai';
import type { Config, ColorConfig } from '@/types';
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