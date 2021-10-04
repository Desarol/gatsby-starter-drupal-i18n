import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.nodeArticle
  const siteTitle = post?.langcode === 'en' ? "Drupal INTL Starter Blog" : "Blog de inicio de Drupal INTL"

  const translationPaths = {
    en: data?.englishPage?.path?.alias,
    es: data?.spanishPage?.path?.alias,
  }

  return (
    <Layout location={location} title={siteTitle} langcode={post.langcode} translationPaths={translationPaths} >
      <Seo
        title={post.title}
        lang={post.langcode}
        description={post.body.summary}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.field_date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.body.value }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate


export const pageQuery = graphql`
  query ArticleById(
    $id: Int!
    $langcode: String!
  ) {
    nodeArticle(drupal_internal__nid: { eq: $id }, langcode: { eq: $langcode }) {
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

    englishPage: nodeArticle(drupal_internal__nid: { eq: $id }, langcode: {eq: "en" }) {
      path {
        alias
      }
    }

    spanishPage: nodeArticle(drupal_internal__nid: { eq: $id }, langcode: {eq: "es" }) {
      path {
        alias
      }
    }
  }
`