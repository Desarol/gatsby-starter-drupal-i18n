import * as React from "react"
import { Link, navigate } from "gatsby"
import Footer from './footer';
import LanguageContextProvider from '../context'

const Layout = ({ location, title, children, langcode,  translationPaths}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath || location.pathname === '/es'
  const path = langcode === 'en' ? '/' : '/es'
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to={path}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to={path} >
        {title}
      </Link>
    )
  }

  return (
    <LanguageContextProvider langcode={langcode}  translationPaths={translationPaths} >
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">
          <p>{header}</p>
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
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageContextProvider>
  )
}

export default Layout
