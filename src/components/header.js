import React, { useContext } from 'react'
import { Link, navigate } from 'gatsby'
import { LanguageContext } from '../context'
import { homePagePaths, translate } from '../translate'

const Header = () => {
  const { translationPaths, langcode } = useContext(LanguageContext)
  const siteTitle = translate(langcode, 'Gatsby + Drupal Internationalization Starter')

  return (
    <header className="global-header">
      <div className="main-heading">
        <Link to={homePagePaths[langcode]}>{siteTitle}</Link>
      </div>
      <select
        id="language"
        name="language"
        value={langcode}
        onChange={(e) => {
          const toLanguage = e.target.value
          navigate(translationPaths[toLanguage])
        }}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </header>
  )
}

export default Header
