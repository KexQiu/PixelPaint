import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModelProps {
  title?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

export const Model: FC<ModelProps> = ({ title, children, open, onCancel }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="bg-#333 rounded-lg shadow-lg min-h-100 min-w-140 relative">
        {title && (
          <div className="flex items-center text-xl font-bold px-4 h-16 shadow-sm z-1 relative ">
            {title}
          </div>
        )}
        <div className="p-6">{children}</div>
        <button
          className="absolute top-3 right-3 p-1 rounded bg-transparent border-none z-2 hover:bg-#444 text-white cursor-pointer"
          onClick={onCancel}
        >
          <i className="i-pixelarticons:close text-2xl" />
        </button>
      </div>
    </div>,
    document.body
  );
};
