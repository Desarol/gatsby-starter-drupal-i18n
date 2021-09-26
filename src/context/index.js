import React, { createContext } from 'react'
import english from './translations/en.json'
import spanish from './translations/es.json'

const translations = {
  en: english,
  es: spanish,
}

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
  const translate = (defaultLanguageText) => {
    const translationText = translations[langcode]?.[defaultLanguageText]
    return translationText ?? defaultLanguageText
  }

  return (
    <LanguageContext.Provider
      value={{
        langcode,
        translationPaths,
        t: translate
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContextProvider
