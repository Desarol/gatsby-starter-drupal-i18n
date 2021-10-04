const path = require(`path`)
const { homePagePaths } = require("./src/translate")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const homeTemplate = path.resolve(`./src/templates/home.js`)
  const articleTemplate = path.resolve(`./src/templates/article.js`)

  const result = await graphql(
    `
      {
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

  Object.entries(homePagePaths).forEach(([langcode, path]) => {
    createPage({
      path,
      component: homeTemplate,
      context: {
        langcode,
      }
    })
  })

  result?.data?.allNodeArticle?.nodes?.forEach((article) => {
    if (!article?.path?.alias) {
      console.warn(`No path for node ${page.nid}. Not creating a page.`)
      return
    }

    createPage({
      path: article.path.alias,
      component: articleTemplate,
      context: {
        nid: article.nid,
        langcode: article.langcode,
      },
    })
  })
}