import { createContext, useState } from 'react';

export const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {}
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}