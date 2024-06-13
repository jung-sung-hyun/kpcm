import { useMemo } from 'react';
import LayoutWrapper from '@components/LayoutWrapper/LayoutWrapper';

const Layout = ({ children }) => {
  const memoizedChildren = useMemo(() => {
    return children;
  }, [children]);

  return <LayoutWrapper>{memoizedChildren}</LayoutWrapper>;
};

export default Layout;