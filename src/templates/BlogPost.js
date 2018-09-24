import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Head from 'react-helmet'
import rehypeReact from 'rehype-react'
import MainLayout from '@/components/MainLayout'
import Link from '@/components/Link'
import ShareWidget from '@/components/ShareWidget'
// import TitledCopy from '@/components/TitledCopy'
import { SupportWidget } from '@/components/Shared'
import Newsticker from '@/components/Newsticker'
import PodcastPlayer from '@/components/PodcastPlayer'
import { colors, fontFamilies, gradients, media } from '@/theme'

const BlogPost = props => {
  const { page: post, BlogPost, NewsTicker, PodcastPlayerMeta } = props.data

  return (
    <MainLayout {...props}>
      <Head
        title={post.frontmatter.title}
        meta={[
          {
            name: `description`,
            content: post.frontmatter.summary || post.excerpt,
          },
          {
            property: `og:type`,
            content: `article`,
          },
          {
            property: `og:image`,
            content:
              post.frontmatter.cover &&
              `${props.data.site.siteMetadata.siteUrl}${
                post.frontmatter.cover.publicURL
              }`,
          },
          {
            property: `article:published_time`,
            itemprop: `datePublished`,
            content: post.fields.dateTime,
          },
          // { property: `article:author`, content: `` },
          // { property: `article:section`, content: `Category` },
          // { property: `article:tag`, content: `Tags` },
          // { property: `article:tag`, content: `Tags` },
        ]}
      />

      <article itemScope itemType="https://schema.org/BlogPosting">
        <PostHeader
          title={post.frontmatter.title}
          subtitle={post.frontmatter.subtitle}
          datetime={post.fields.dateTime}
          dateStr={post.fields.dateStr}
          dateStrLocalized={post.fields.dateStrLocalized}
          podcast={post.frontmatter.podcast}
          podcastPlayerMeta={PodcastPlayerMeta}
          shortUrl={
            props.data.site.siteMetadata.siteUrl + post.fields.slug_short
          }
        />

        <PostBody>{renderAst(post.htmlAst)}</PostBody>
      </article>

      <ShareWidget
        label={BlogPost.frontmatter.shareLabel}
        post={post}
        siteUrl={props.data.site.siteMetadata.siteUrl}
        css={{
          margin: `2rem auto 4rem`,
          maxWidth: `760px`,
        }}
      />

      {/* <TitledCopy
        centered
        title={BlogPost.frontmatter.SupportWidget.title}
        paragraphs={BlogPost.frontmatter.SupportWidget.description}
        css={{
          margin: `0 auto 3rem`,
          [media.lessThan(`medium`)]: {
            '& h2': { fontSize: `2rem` },
            '& div': { fontSize: `.9rem` },
          },
        }}
      /> */}

      <SupportWidget
        title={BlogPost.frontmatter.SupportWidget.title}
        description={BlogPost.frontmatter.SupportWidget.description}
        paypalButton={
          props.data.SiteMeta.frontmatter.assets.paypalButton.publicURL
        }
        bankButton={props.data.SupportWidget.frontmatter.bankButton}
        bankButtonAlt={props.data.SupportWidget.frontmatter.bankButtonAlt}
        bankInfo={props.data.SupportWidget.frontmatter.bankInfo}
        bankDetails={props.data.SupportWidget.frontmatter.bankDetails}
        lang={props.pageContext.lang}
        css={{ margin: `0 0 3rem` }}
      />

      {post.fields.suggested && (
        <Newsticker
          items={post.fields.suggested}
          title={BlogPost.frontmatter.relatedArticlesLabel}
          linkLabel={NewsTicker.frontmatter.linkLabel}
          link={NewsTicker.frontmatter.link}
          readmoreLabel={NewsTicker.frontmatter.readmoreLabel}
          layout="row"
        />
      )}

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          textAlign: `center`,
          margin: `2rem auto 3rem`,
          overflow: `hidden`,
          width: `99%`,
          [media.greaterThan(`medium`)]: {
            width: `80%`,
          },
          position: `relative`,
          '&:before': {
            content: `""`,
            height: `1px`,
            width: `100%`,
            position: `absolute`,
            display: `block`,
            top: `50%`,
            right: `0`,
            left: `0`,
            // background: `linear-gradient(to right, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
            background: `linear-gradient(to right, rgba(204,204,204,0.13), #abaaaa, rgba(204,204,204,0.13)) no-repeat`,
          },
        }}
      >
        <div
          css={{
            position: `relative`,
            display: `flex`,
            justifyContent: `space-between`,
            background: `#fff`,
          }}
        >
          {[`older`, `all`, `newer`].map(
            x =>
              post.fields[x] && (
                <div
                  key={post.fields[x].fields.url}
                  css={{
                    color: `#c3c3c3`,
                    padding: `.5rem`,
                    margin: `0 2rem`,
                  }}
                >
                  <Link
                    to={post.fields[x].fields.url}
                    title={post.fields[x].frontmatter.title}
                  >
                    {BlogPost.frontmatter.pager[x]}
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </MainLayout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}

export default BlogPost

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...SupportWidget
    ...NewsTicker
    ...PodcastPlayer

    BlogPost: blogPostAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        shareLabel
        relatedArticlesLabel
        SupportWidget {
          title
          description
        }
        pager {
          older
          newer
          all
        }
      }
    }

    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        dateTime
        dateStr
        dateStrLocalized
        slug_short
        url
        translations {
          fields {
            url
          }
          frontmatter {
            title
            lang
            slug
          }
        }
        newer {
          frontmatter {
            title
          }
          fields {
            url
          }
        }
        all {
          frontmatter {
            title
          }
          fields {
            url
          }
        }
        older {
          frontmatter {
            title
          }
          fields {
            url
          }
        }
        suggested {
          excerpt(pruneLength: 135)
          fields {
            url
          }
          frontmatter {
            id
            title
            lang
            slug
            summary
            cover {
              image: childImageSharp {
                fluid(
                  maxWidth: 400
                  maxHeight: 230
                  quality: 75
                  cropFocus: ENTROPY
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      htmlAst
      frontmatter {
        title
        subtitle
        id
        oldId
        slug
        lang
        summary
        tweet_id
        cover {
          publicURL
        }
        podcast {
          audio
          video
        }
      }
    }
  }
`

// const GaimaImage = ({ aspectRatio, children }) => (
//   <div css={{ flex: aspectRatio }}>{children}</div>
// )
// GaimaImage.propTypes = {
//   aspectRatio: PropTypes.string,
// }

// const GaimaVideo = ({ preview, src, width, height }) => (
//   // <iframe src={children} title={children}></iframe>
//   <div>
//     <img src={preview} alt="video preview" width={width} height={height} />
//     <iframe src={src} width={width} height={height} title="youtube video" />
//   </div>
// )
// GaimaVideo.propTypes = {
//   preview: PropTypes.string,
//   src: PropTypes.string,
//   width: PropTypes.string,
//   height: PropTypes.string,
// }

const renderAst = new rehypeReact({
  createElement,
  // components: { 'example-component': ExampleComponent },
}).Compiler

const PostHeader = ({
  title,
  subtitle,
  dateTime,
  dateStr,
  dateStrLocalized,
  podcast,
  podcastPlayerMeta,
  shortUrl,
}) => (
  <div
    css={{
      textAlign: `center`,
      margin: 0,
    }}
  >
    <h1 itemProp="headline" css={{ margin: 0 }}>
      {title}
    </h1>
    {subtitle && <h3 css={{ marginTop: `.5rem` }}>{subtitle}</h3>}

    <div
      css={{
        display: `block`,
        textAlign: `center`,
        fontSize: `.8rem`,
        margin: `1rem auto 0`,
        width: `90%`,
        position: `relative`,
        [media.greaterThan(`small`)]: {
          width: `60%`,
        },
        [media.greaterThan(`medium`)]: {
          width: `30%`,
        },
        '&:before': {
          content: `""`,
          height: `1px`,
          width: `100%`,
          position: `absolute`,
          display: `block`,
          top: `50%`,
          left: `0`,
          right: `0`,
          // background: `linear-gradient(to right, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
          background: `linear-gradient(to right, rgba(204,204,204,0.13), #abaaaa, rgba(204,204,204,0.13)) no-repeat`,
        },
      }}
    >
      <Link to={shortUrl} title={shortUrl} ext>
        <time
          itemProp="datePublished"
          content={dateTime}
          dateTime={dateTime}
          css={{
            position: `relative`,
            display: `inline-block`,
            background: `#fff`,
            color: `#c3c3c3`,
            padding: `0 .5rem`,
          }}
        >
          {dateStrLocalized}
        </time>
      </Link>
    </div>

    <PodcastPlayer podcast={podcast} meta={podcastPlayerMeta.frontmatter} />
  </div>
)
PostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  dateTime: PropTypes.string,
  publishedTime: PropTypes.object,
  dateStr: PropTypes.string,
  dateStrLocalized: PropTypes.string,
  podcast: PropTypes.object,
  podcastPlayerMeta: PropTypes.object,
  shortUrl: PropTypes.string,
}

const PostBody = ({ children }) => (
  <div
    css={{
      wordBreak: `break-word`,
      wordWrap: `break-word`,
      '& > div > *': {
        maxWidth: [`760px`, `80ch`],
        marginTop: `2.5rem`,
        marginBottom: 0,
        // we reset inline-galleries later
        marginRight: `auto`,
        marginLeft: `auto`,
      },
      '& h2, & h3, & h4, & h5, & h6': {
        marginTop: `2rem`,
        textAlign: `center`,
      },
      '& h3': { fontSize: `1.7rem` },
      '& p:first-child': {
        marginTop: `3rem`,
      },
      '& p + p': {
        marginTop: `1.5rem`,
      },
      '& ul, & ol': {
        listStylePosition: `inside`,
      },
      // '& .text-centered': {
      //   textAlign: `center`,
      // },
      // '& p + .inline-gallery': {
      //   marginTop: `3rem`,
      // },
      '& .inline-gallery': {
        maxWidth: `100%`,
        display: `flex`,
        justifyContent: `center`,
        [media.lessThan(`small`)]: {
          flexDirection: `column`,
          alignItems: `center`,
          '& > *': {
            marginTop: `1rem`,
          },
        },
        '& > *': {
          width: 600,
          maxWidth: `80%`,
          margin: `0 .5rem`,
        },
        // '& > *:first-child, & > *:last-child': {
        //   marginRight: `auto`,
        //   marginLeft: `auto`,
        // },
      },
      '& .inline-gallery + .inline-gallery': {
        marginTop: `1rem`,
      },
      '& figure': {
        position: `relative`,
        '& > figcaption': {
          display: `flex`,
          background: gradients.primary,
          position: `absolute`,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          color: colors.darkWhite,
          padding: `.5rem`,
          justifyContent: `center`,
          alignItems: `center`,
          textAlign: `center`,
          fontFamily: fontFamilies.accent,
          fontSize: `1.4rem`,
          letterSpacing: `.1rem`,
          overflow: `hidden`,
          transition: `all .35s`,
          opacity: 0,
          userSelect: `none`,
        },
        '&:hover > figcaption': {
          opacity: 1,
        },
      },
      // '& .video-wrapper': {
      //   position: `relative`,
      //   overflow: `hidden`,
      //   paddingTop: `29.25%`,
      //   width: `98%`,
      //   maxWidth: `700px`,
      //   margin: `0 auto 3rem`,
      //   '& > iframe': {
      //     position: `absolute`,
      //     top: `0`,
      //     left: `0`,
      //     width: `100%`,
      //     height: `100%`,
      //     border: `0`,
      //   },
      // },
      '& iframe': { border: 0 },
    }}
  >
    {children}
  </div>
)
