import React from 'react'
import PropTypes from 'prop-types'
// import VisibilitySensor from 'react-visibility-sensor'
import ArticlePreview from '@/components/ArticlePreview'

const RenderArticles = ({ articles, ...props }) => (
  <div
    {...props}
  >
    {articles &&
      articles.map(({ node }) => (
        // <VisibilitySensor
        //   key={node.frontmatter.id}
        //   partialVisibility
        // >
        //   {({ isVisible }) =>
        <ArticlePreview
          key={node.frontmatter.id}
          article={node}
          // isVisible={isVisible}
        />
        //   }
        // </VisibilitySensor>
      ))}
  </div>
)

RenderArticles.propTypes = {
  articles: PropTypes.array,
}

export default RenderArticles
