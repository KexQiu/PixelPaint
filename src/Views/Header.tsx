import { type FC, type ComponentProps, useCallback } from 'react';
import cls from 'classnames';
import { useAtomValue } from 'jotai';
import { appAtom } from '@/states';
import { download } from '@/utils/download';
import useConfig from '@/hooks/useConfig';
import useColorsMatrix from '@/hooks/useColorsMatrix';

export const Header: FC<ComponentProps<'header'>> = ({
  className,
  ...restProps
}) => {
  const {config} = useConfig();
  const app = useAtomValue(appAtom);

  const handleDownload = useCallback(() => {
    if (!app) return;
    download(app);
  }, [app]);

  const { showOptionsModal } = useConfig();

  return (
    <header
      {...restProps}
      className={cls(
        'header w-full h-16 shadow flex items-center justify-between bg-#333 px-4',
        className
      )}
    >
      <div className="left-oper-btns">
        <button
          className="flex items-center gap-2 cursor-pointer border-none bg-transparent text-inherit hover:bg-#444 rounded-md px-4 py-2 text-lg"
          onClick={() => {
            showOptionsModal();
          }}
        >
          <i className="i-pixelarticons:image text-2xl" />
          <span>New</span>
        </button>
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 cursor-pointer border-none bg-transparent text-inherit hover:bg-#444 rounded-md px-4 py-2 text-lg"
      >
        <i className="i-pixelarticons:arrow-bar-down text-2xl" />
        <span>Download</span>
      </button>
    </header>
  );
};

export default Header;
