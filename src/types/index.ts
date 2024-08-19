

export interface Config {
  width: number;
  height: number;
  quality: number;
}

export type ColorConfig = [ColorResult, ColorResult];

export interface ColorResult {
  color: number;
  alpha: number;
}

export type Coordinate = [number, number];
