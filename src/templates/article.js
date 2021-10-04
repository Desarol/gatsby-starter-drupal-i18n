import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { translate } from "../translate"

const ArticleTemplate = ({ data, location }) => {
  const article = data.nodeArticle
  const siteTitle = translate(article?.langcode, 'Gatsby + Drupal Internationalization Starter')

  const translationPaths = {
    en: data?.englishPage?.path?.alias,
    es: data?.spanishPage?.path?.alias,
  }

  return (
    <Layout location={location} title={siteTitle} langcode={article.langcode} translationPaths={translationPaths} >
      <Seo
        title={article.title}
        lang={article.langcode}
        description={article.body.summary}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{article.title}</h1>
          <p>{article.field_date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: article.body.value }}
          itemProp="articleBody"
        />
        <hr />
      </article>
    </Layout>
  )
}

export default ArticleTemplate


export const pageQuery = graphql`
  query ArticleById(
    $nid: Int!
    $langcode: String!
  ) {
    nodeArticle(drupal_internal__nid: { eq: $nid }, langcode: { eq: $langcode }) {
      langcode
      title
      field_date(formatString: "MMM DD, YYYY")
      body {
        summary
        value
      }
      path {
        alias
      }
    }

    englishPage: nodeArticle(drupal_internal__nid: { eq: $nid }, langcode: {eq: "en" }) {
      path {
        alias
      }
    }

    spanishPage: nodeArticle(drupal_internal__nid: { eq: $nid }, langcode: {eq: "es" }) {
      path {
        alias
      }
    }
  }
`