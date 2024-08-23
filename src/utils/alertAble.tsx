import React, { ComponentProps } from 'react';
import { createRoot } from 'react-dom/client';

interface Config<T> {
  onCancelPropName?: keyof T;
  onOkPropName?: keyof T;
  openPropName?: keyof T;
  onOk?: () => void;
}

export default function alertAble<T extends Record<string, any>>(
  FcComponent: React.ComponentType<T> & {
    open?: (props?: Partial<T>, config?: Config<T>) => void;
    close?: () => void;
  }
) {
  FcComponent.open = (props?: Partial<T>) => {
    
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const { ...restProps } = props || ({} as Partial<T>);

    FcComponent.close = () => {
      root.unmount();
      document.body.removeChild(container);
    };

    const makeElement = (visible: boolean) => {

      root.render(
        <FcComponent {...(restProps as T)} open={visible} onCancel={FcComponent.close}  />
      )
    };

    makeElement(true);
  };

  return FcComponent as {
    (props: T): React.ReactElement;
    open: (props?: Partial<T>, config?: Config<T>) => void;
    close: () => void;
  };
}
