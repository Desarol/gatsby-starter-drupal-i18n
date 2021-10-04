import * as React from "react"
import { Link, navigate } from "gatsby"
import Header from "./header"
import Footer from './footer';
import LanguageContextProvider from '../context'

const Layout = ({ children, langcode,  translationPaths }) => {
  return (
    <LanguageContextProvider langcode={langcode} translationPaths={translationPaths}>
      <div className="global-wrapper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageContextProvider>
  )
}

export default Layout
