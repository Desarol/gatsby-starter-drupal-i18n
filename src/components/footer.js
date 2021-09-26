import React, { useContext } from 'react'
import { LanguageContext } from '../context';
 
 const Footer = () => {
   const { t } = useContext(LanguageContext)
 
   return (
    <footer>
      © {new Date().getFullYear()}, {t('built')}
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
   )
 }
 
 export default Footer
 