import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { colors } from '@/theme'

const ArticlePreview = ({ article, isVisible, ...props }) => (
  <article css={articleStyles.article(isVisible)} {...props}>
    <Link to={article.fields.url}>
      {article.frontmatter.cover && (
        <Img fluid={article.frontmatter.cover.childImageSharp.fluid} />
      )}
      <h2 css={articleStyles.title}>{article.frontmatter.title}</h2>
      {/* {article.frontmatter.subtitle && (
        <h4 css={articleStyles.title}>{article.frontmatter.subtitle}</h4>
      )} */}
    </Link>

    <p css={articleStyles.body}>
      {article.frontmatter.summary || article.excerpt}
    </p>

    <footer css={articleStyles.footer}>
      <div css={articleStyles.footerInner}>
        <time css={articleStyles.time}>{article.fields.dateStrLocalized}</time>
        <Link to={article.fields.url}>{`read more`}</Link>
      </div>
    </footer>
  </article>
)

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
}

export default ArticlePreview

const articleStyles = {
  article: isVisible => ({
    // flex: `0 0 327`,
    position: `relative`,
    // width: `327`,
    // width: `29%`,
    // marginBottom: `4rem`,
    boxShadow: `0 0 8px 0px ${colors.gray52}`,
    background: colors.lightBlue,
    display: `flex`,
    flexDirection: `column`,
    overflow: `hidden`,
  }),
  title: {
    margin: `.5rem 1rem 0`,
    letterSpacing: `.05rem`,
  },
  body: {
    margin: `1rem`,
    fontSize: `.9rem`,
  },
  footer: {
    marginTop: `auto`,
    // borderTop: `1px solid #ccc`,
    // borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
    // borderImageSlice: `1`,
    color: colors.gray2,
    fontSize: `.9rem`,
    position: `relative`,
    '&:before': {
      content: `""`,
      width: `100%`,
      height: `1px`,
      position: `absolute`,
      display: `block`,
      top: `0`,
      left: `0`,
      right: `0`,
      background: `linear-gradient(to right, ${colors.gray4}, ${
        colors.gray3
      }, ${colors.gray4}) no-repeat`,
    },
  },
  footerInner: {
    margin: `0 1rem`,
    lineHeight: `2.5rem`,
    display: `flex`,
    justifyContent: `space-between`,
  },
  time: {
    fontSize: `0.8rem`,
  },
}
