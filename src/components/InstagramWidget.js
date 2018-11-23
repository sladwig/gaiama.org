import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { colors, fontFamilies, fullPageWidth, media } from '@/theme'
import { mediaQuery } from '@/components/MediaQuery'

const InstagramWidget = ({ user, followLink, bg, images }) => {
  const imgs = mediaQuery(`(max-width: 779px)`) ? images.slice(0, 3) : images

  return (
    <div>
      <div
        css={{
          display: `flex`,
          justifyContent: `space-around`,
          backgroundSize: `cover`,
          position: `relative`,
          padding: `2rem 0`,
          ...fullPageWidth,
        }}
      >
        <Img
          fluid={bg}
          css={`
            position: absolute !important;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          `}
        />
        {imgs.map(x => (
          <div
            key={x.node.id}
            css={{
              width: `240px`,
              transition: `all .3s ease`,
              ':hover': { transform: `scale(1.02)` },
            }}
          >
            <a
              href={`https://www.instagram.com/p/${
                x.node.id
              }/?taken-by=${user}`}
              target="_blank"
              rel="noopener noreferrer"
              css={`
                border: none;
                :hover {
                  background-color: transparent;
                }
              `}
            >
              <Img
                alt="GaiAma on Instagram"
                fluid={x.node.image.image.fluid}
                css={{ border: `1px solid ${colors.black}` }}
              />
            </a>
          </div>
        ))}
      </div>
      <div
        css={{
          marginTop: `.5rem`,
          [media.greaterThan(`xsmall`)]: {
            textAlign: `right`,
          },
        }}
      >
        <a
          href={`https://instagram.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          css={{
            display: `inline-block`,
            border: `none`,
            fontFamily: fontFamilies.accent,
            lineHeight: `.8`,
            letterSpacing: `.2rem`,
            fontSize: `1rem`,
            [media.greaterThan(`small`)]: {
              letterSpacing: `.3rem`,
            },
          }}
        >
          <span
            css={{
              letterSpacing: `-.1rem`,
              marginRight: `1rem`,
            }}
          >
            —————————&gt;&gt;
          </span>
          &nbsp;
          {followLink}
        </a>
      </div>
    </div>
  )
}

InstagramWidget.propTypes = {
  user: PropTypes.string,
  followLink: PropTypes.string,
  bg: PropTypes.object,
  images: PropTypes.array,
}

export { InstagramWidget }

export const instaQuery = graphql`
  fragment instagram on Query {
    instagram: instagramFeedAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        lang
        instagramUser
        followLink
        bg {
          image: childImageSharp {
            fluid(maxWidth: 1440, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    instagramImages: allInstaNode(
      limit: 4
      sort: { fields: [timestamp], order: DESC }
    ) {
      edges {
        node {
          id
          image: localFile {
            image: childImageSharp {
              fluid(maxWidth: 240, maxHeight: 240, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
