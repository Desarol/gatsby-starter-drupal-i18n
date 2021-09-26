import React from 'react'
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const nodePage = data.nodePage
  const allNodeArticles = data.allNodeArticle.nodes

  const posts = allNodeArticles?.filter((post) => (
    post.langcode === nodePage.langcode
  ))

  const translationPaths = {
    en: data?.englishPage?.path?.alias ?? '/',
    es: data.spanishPage?.path?.alias,
  }

  return (
    <Layout location={location} title={nodePage?.title} langcode={nodePage.langcode} translationPaths={translationPaths} >
      <Seo title={nodePage?.title} lang={nodePage.langcode} />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return (
            <li key={post.path.alias}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post?.path?.alias} itemProp="url">
                      <span itemProp="headline">{post?.title}</span>
                    </Link>
                  </h2>
                  <small>{post?.field_date}</small>
                </header>
                <section>
                  <p>{post?.body?.summary}</p>
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query PageById(
    $id: Int!
    $langcode: String!
  ) {
    nodePage(drupal_internal__nid: { eq: $id }, langcode: { eq: $langcode }) {
      langcode
      title
    }

    englishPage: nodePage(drupal_internal__nid: { eq: $id }, langcode: {eq: "en" }) {
      path {
        alias
      }
    }

    spanishPage: nodePage(drupal_internal__nid: { eq: $id }, langcode: {eq: "es" }) {
      path {
        alias
      }
    }

    allNodeArticle {
      nodes {
        langcode
        title
        field_date(formatString: "MMM DD, YYYY")
        body {
          summary
        }
        path {
          alias
        }
      }
    }
  }
`
