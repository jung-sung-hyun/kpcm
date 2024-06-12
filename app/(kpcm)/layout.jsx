import LayoutWrapper from '@components/LayoutWrapper/LayoutWrapper';
export default function Layout({ children }) {
  return <LayoutWrapper>
    {children}
  </LayoutWrapper>
}