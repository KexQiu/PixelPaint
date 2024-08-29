import { atom, useAtom } from 'jotai';
import { ColorResult } from '@/types';
import { parseColor } from '@/utils/color';

export const colorAtom = atom<ColorResult>({
  color: 0x000000,
  alpha: 1,
});

export default function useColor() {
  const [currentColor, setColorValue] = useAtom(colorAtom);

  const setColor = (color: Parameters<typeof parseColor>[0]) => {
    setColorValue(parseColor(color));
  };

  return {
    currentColor,
    setColor,
  };
}
