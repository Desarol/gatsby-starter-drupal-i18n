import React, { createContext } from 'react'
import { translate } from '../translate'

const languageContextDefaultValue = {
  langcode: 'en',
  translationPaths: {
    en: '',
    es: '',
  },
}

export const LanguageContext = createContext(languageContextDefaultValue)

const LanguageContextProvider = ({
  children,
  langcode,
  translationPaths,
}) => {
  return (
    <LanguageContext.Provider
      value={{
        langcode,
        translationPaths,
        t: (text) => translate(langcode, text)
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContextProvider
