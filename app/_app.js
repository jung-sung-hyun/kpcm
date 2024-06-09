import { GlobalProvider } from '../contexts/GlobalContext';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
export default MyApp;