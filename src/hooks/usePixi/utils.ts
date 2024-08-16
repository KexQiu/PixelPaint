import { Config, ColorResult } from '@/types';
import { Graphics } from 'pixi.js';

// 绘制到操作层
export const renderMatrix = (
  matrix: ColorResult[][],
  pixels: Graphics[][],
  config: Config
) => {
  const { width, height, quality } = config;

  if (!matrix || !pixels) return;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const pixel = pixels[row][col];
      const color = matrix[row][col];
      pixel.clear();
      pixel.beginFill(color.color, color.alpha);
      pixel.drawRect(col * quality, row * quality, quality, quality);
      pixel.endFill();
    }
  }
};

