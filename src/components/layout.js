import * as React from "react"
import { Link, navigate } from "gatsby"
import Header from "./header"
import Footer from './footer';
import LanguageContextProvider from '../context'

const Layout = ({ title, children, langcode,  translationPaths }) => {
  return (
    <LanguageContextProvider langcode={langcode} translationPaths={translationPaths}>
      <div className="global-wrapper">
        <Header title={title} />
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageContextProvider>
  )
}

export default Layout
