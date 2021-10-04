const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const articleTemplate = path.resolve(`./src/templates/article.js`)

  const result = await graphql(
    `
      {
        allNodePage {
          nodes {
            nid: drupal_internal__nid
            langcode
            path {
              alias
            }
          }
        }

        allNodeArticle {
          nodes {
            nid: drupal_internal__nid
            langcode
            path {
              alias
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error building your page`,
      result.errors
    )
    return
  }

  result?.data?.allNodePage?.nodes?.forEach((page) => {
    createPage({
      path: page.path.alias ?? '/',
      component: pageTemplate,
      context: {
        id: page.nid,
        langcode: page.langcode,
      },
    })
  })


  result?.data?.allNodeArticle?.nodes?.forEach((article) => {
    createPage({
      path: article.path.alias,
      component: articleTemplate,
      context: {
        id: article.nid,
        langcode: article.langcode,
      },
    })
  })
}