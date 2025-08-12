import { clsx } from 'clsx';
import type { FC, JSX,ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const HeaderTitle: FC<CardProps> = ({ className, as = 'h3', children }) => {
  const Tag = as;
  return (
    <Tag className={clsx('text-lg font-medium leading-6 text-gray-900', className)}>
      {children}
    </Tag>
  );
};

const HeaderBase: FC<CardProps> = ({ className, children }) => {
  return (
    <div className={clsx('px-4 py-5 bg-white border-b border-gray-200 sm:px-6', className)}>
      {children}
    </div>
  );
};

const Header = HeaderBase as FC<CardProps> & {
  Title: FC<CardProps>;
};
Header.Title = HeaderTitle;

const Body: FC<CardProps> = ({ className, children }) => {
  
  return <div className={clsx('px-4 py-5 sm:p-6', className)}>{children}</div>;
};

const Footer: FC<CardProps> = ({ className, children }) => {
  return <div className={clsx('bg-white border-t border-gray-200', className)}>{children}</div>;
};

type CardComponentType = FC<CardProps> & {
  Header: typeof Header;
  Body: FC<CardProps>;
  Footer: FC<CardProps>;
};

const CardComponent: CardComponentType = ({ className, children }) => {
  
  return (
    <div className={clsx('overflow-hidden bg-white rounded-lg shadow', className)}>
      {children}
    </div>
  );
};

CardComponent.Header = Header;
CardComponent.Body = Body;
CardComponent.Footer = Footer;

export default CardComponent;
