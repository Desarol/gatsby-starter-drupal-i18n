const spanish = require('../translations/es.json')

const translations = {
  es: spanish,
}

module.exports.translate = (langcode, defaultLanguageText) => {
  const translationText = translations[langcode]?.[defaultLanguageText]
  return translationText ?? defaultLanguageText
}

/**
 * You should create the home page from
 * nodes in Drupal.
 * 
 * We are using a hard-coded home page here
 * to simplify the example.
 */
module.exports.homePagePaths = { 'en': '/', 'es': '/es' }
