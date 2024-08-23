import { Model } from '@/components/Model';
import useConfig from '@/hooks/useConfig';
import Input from '@/components/Input';
import { useState } from 'react';

interface OptionsModalProps {
  open: boolean;
  onCancel: () => void;
}

export const OptionsModal = (props: OptionsModalProps) => {
  const { setConfig } = useConfig();
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [quality, setQuality] = useState<number>();
  const handleNewDrawing = () => {
    if (!width || !height || !quality) return;
    setConfig({
      width: width,
      height: height,
      quality: quality,
    });
    props.onCancel();
  };

  return (
    <Model
      title={
        <span className="flex items-center gap-2">
          <i className="i-pixelarticons:image text-2xl" /> New Drawing
        </span>
      }
      {...props}
    >
      <div>
        <h1 className="text-2xl font-semibold">Blank Canvas</h1>
        <h4 className="text-sm opacity-30 mt-1">
          Start a new drawing. Max 1000x1000 size
        </h4>
      </div>
      <div className="mt-6 mb-5">
        <Input
          label="Width"
          name="width"
          value={width}
          onChange={value => setWidth(value as number)}
          type="number"
          max={1000}
          min={1}
        />
        <Input
          label="Height"
          name="height"
          value={height}
          onChange={value => setHeight(value as number)}
          type="number"
          max={1000}
          min={1}
        />
        <Input
          label="Quality"
          name="quality"
          value={quality}
          onChange={value => setQuality(value as number)}
          type="number"
          max={100}
          min={1}
        />
      </div>
      <div className="mt-6">
        <button
          onClick={handleNewDrawing}
          className="w-full bg-blue-400 text-white py-2 rounded-md border-none py-2 text-xl hover:bg-blue-300 cursor-pointer"
        >
          New Drawing
        </button>
      </div>
    </Model>
  );
};

export default OptionsModal;
