const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const home = path.resolve(`./src/templates/home.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

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
      component: home,
      context: {
        id:  page.nid,
        langcode: page.langcode,
      },
    })
  })


  result?.data?.allNodeArticle?.nodes?.forEach((article) => {
    createPage({
      path: article.path.alias,
      component: blogPost,
      context: {
        id:  article.nid,
        langcode: article.langcode,
      },
    })
  })
}