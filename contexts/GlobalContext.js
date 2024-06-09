import { createContext, useState } from 'react';
// 컨텍스트 생성
export const GlobalContext = createContext({
  globalState: { user: null, theme: 'light' },
  setGlobalState: () => {}
});

// 컨텍스트 제공자 컴포넌트
export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    theme: 'light',
  });
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>
  );
};