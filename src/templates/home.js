import React from 'react'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { homePagePaths, translate } from '../translate'

const PageTemplate = ({ data, location, pageContext }) => {
  const allNodeArticles = data.allNodeArticle.nodes

  return (
    <Layout
      location={location}
      title={translate(pageContext?.langcode, 'Home')}
      langcode={pageContext?.langcode}
      translationPaths={homePagePaths}
    >
      <Seo title={translate(pageContext?.langcode, 'Home')} />
      <ol style={{ listStyle: `none` }}>
        {allNodeArticles.map(article => {
          return (
            <li key={article.path.alias}>
              <article
                className="article-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={article?.path?.alias} itemProp="url">
                      <span itemProp="headline">{article?.title}</span>
                    </Link>
                  </h2>
                  <small>{article?.field_date}</small>
                </header>
                <section>
                  <p>{article?.body?.summary}</p>
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById($langcode: String!) {
    allNodeArticle(filter: { langcode: { eq: $langcode } }) {
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
