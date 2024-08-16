import type { FC, ComponentProps } from 'react';
import cls from 'classnames';

export const Header: FC<ComponentProps<'header'>> = ({
  className,
  ...restProps
}) => (
  <header
    {...restProps}
    className={cls('header w-full h-16 shadow', className)}
  ></header>
);

export default Header;
