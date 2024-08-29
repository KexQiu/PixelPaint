import type { ColorResult } from '@/types';

export function parseColor(
  inputColor: string | [number, number, number, number?] | ColorResult
): ColorResult {
  if (typeof inputColor === 'object' && 'color' in inputColor) {
    return inputColor as ColorResult;
  }

  let color = 0xffffff; // 默认颜色为白色
  let alpha = 1; // 默认透明度为 1

  // 检查输入颜色的格式
  if (typeof inputColor === 'string') {
    // 处理十六进制颜色
    if (inputColor.startsWith('#')) {
      // 处理 3 位和 6 位十六进制颜色
      if (inputColor.length === 4) {
        color = parseInt(
          inputColor[1] +
            inputColor[1] +
            inputColor[2] +
            inputColor[2] +
            inputColor[3] +
            inputColor[3],
          16
        );
      } else if (inputColor.length === 7) {
        color = parseInt(inputColor.slice(1), 16);
      } else if (inputColor.length === 9) {
        color = parseInt(inputColor.slice(1, 7), 16);
        alpha = parseInt(inputColor.slice(7), 16) / 255; // 处理带 alpha 的十六进制颜色
      }
    } else if (inputColor.startsWith('rgb')) {
      // 处理 rgb 和 rgba 颜色
      const rgbValues = inputColor.match(/\d+/g);
      if (rgbValues) {
        color =
          (parseInt(rgbValues[0]) << 16) |
          (parseInt(rgbValues[1]) << 8) |
          parseInt(rgbValues[2]);
        if (rgbValues.length === 4) {
          alpha = parseFloat(rgbValues[3]);
        }
      }
    }
  } else if (Array.isArray(inputColor) && inputColor.length >= 3) {
    // 处理 RGB 数组
    color = (inputColor[0] << 16) | (inputColor[1] << 8) | inputColor[2];
    if (inputColor.length === 4) {
      alpha = inputColor[3]!;
    }
  }

  return { color, alpha };
}

export const colorResultToHexString = (color: ColorResult): string => {
  const hexColor = color.color.toString(16).padStart(6, '0');
  const alphaHex = Math.round(color.alpha * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${hexColor}${alphaHex}`;
};
