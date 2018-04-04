import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import slugify from 'slugify'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import Newsticker from '@/components/Newsticker'
import { SupportWidget } from '@/components/Shared'
import { breakPoints } from '@/theme'

const AboutPage = props => {
  const { page, NewsTicker } = props.data
  return (
    <MainLayout {...props}>
      <TitledCopy
        centered
        title={page.frontmatter.intro.title}
        paragraphs={page.frontmatter.intro.text}
        css={{ marginBottom: `6rem` }}
      />

      <div css={{ display: `flex`, justifyContent: `space-between` }}>
        <div css={{ [breakPoints.minMd]: { width: `70%` } }}>
          <div css={{ '& > div': { marginBottom: `4rem` } }}>
            {page.frontmatter.bios.map(bio => (
              <div
                key={bio.id}
                id={slugify(bio.name)}
                css={{
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                <Img
                  resolutions={bio.img.image.resolutions}
                  css={{
                    borderRadius: `50%`,
                    marginRight: `2rem`,
                  }}
                />
                <div>
                  <h4 id={slugify(bio.name)} css={{ fontSize: `2rem` }}>
                    {bio.name}
                  </h4>
                  <div css={{ marginBottom: `.5rem` }}>
                    {bio.position}
                    <br/>
                    {bio.field}
                  </div>
                  {console.log(bio)}
                  <p
                    css={{ textAlign: `justify` }}
                    dangerouslySetInnerHTML={{ __html: bio.bio }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 css={{
              fontSize: `2rem`,
              marginBottom: `3.5rem`,
              textAlign: `center`,
            }}>
              {page.frontmatter.specialThanks.title}
            </h2>

            <div css={{
              display: `flex`,
              justifyContent: `space-between`,
              flexWrap: `wrap`,
              '& > div:not(:last-child)': {
                marginBottom: `3rem`,
              },
            }}>
              {page.frontmatter.specialThanks.bios.map(bio => (
                <div
                  key={bio.id}
                  id={slugify(bio.name)}
                  css={{ textAlign: `center` }}
                >
                  <Img
                    resolutions={bio.img.image.resolutions}
                    css={{
                      borderRadius: `50%`,
                      width: `100px !important`,
                      height: `100px !important`,
                    }}
                  />
                  <div>
                    <h4 id={slugify(bio.name)} css={{ fontSize: `1.7rem` }}>
                      {bio.name}
                    </h4>
                    <p
                      css={{ fontSize: `.85rem` }}
                      dangerouslySetInnerHTML={{ __html: bio.bio }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          css={{
            width: `23%`,
            margin: `2rem 0`,
            '& .gatsby-image-outer-wrapper': {
              display: `flex`,
            },
          }}
        >
          {page.frontmatter.peopleGallery.map((x, i) => (
            <Img
              key={i}
              resolutions={x.image.resolutions}
              css={{ maxWidth: `100%` }}
            />
          ))}
        </div>
      </div>

      <SupportWidget
        contactLink={props.data.SupportWidget.frontmatter.contactLink}
        // cryptos={props.data.Cryptos.edges}
        readMoreLink={props.data.SupportWidget.frontmatter.readMoreLink}
        readMoreLabel={props.data.SupportWidget.frontmatter.readMoreLabel}
        artwork={page.frontmatter.sidebar.artwork}
        css={{ margin: `0 0 5rem` }}
      />

      <Newsticker
        items={props.data.news.edges}
        title={NewsTicker.frontmatter.title}
        linkLabel={NewsTicker.frontmatter.linkLabel}
        link={NewsTicker.frontmatter.link}
        readmoreLabel={NewsTicker.frontmatter.readmoreLabel}
        layout={page.frontmatter.NewsTicker.layout}
      />
    </MainLayout>
  )
}
AboutPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    SupportWidget: PropTypes.object,
    Cryptos: PropTypes.object,
    news: PropTypes.object,
    NewsTicker: PropTypes.object,
  }),
}
export default AboutPage

export const query = graphql`
  query AboutPageQuery (
    $lang: String!
    $slug: String!
  ) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...NewsTicker
    ...newstickerLandscape
    ...SupportWidget
    #...Cryptos

    page: javascriptFrontmatter (
      frontmatter: {
        slug: { eq: $slug }
      }
    ) {
      fields {
        translations {
          frontmatter {
            title
            lang
            slug
          }
        }
      }
      frontmatter {
        title
        lang
        slug
        intro {
          title
          text
        }
        NewsTicker {
          layout
        }
        bios {
          id
          name
          position
          field
          bio
          img {
            image: childImageSharp {
              resolutions(width: 150, height: 150, quality: 75) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
        specialThanks {
          title
          bios {
            id
            name
            bio
            img {
              image: childImageSharp {
                resolutions(width: 150, height: 150, quality: 75) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
        sidebar {
          artwork {
            image: childImageSharp {
              resolutions {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
        peopleGallery {
          image: childImageSharp {
            resolutions(width: 258, height: 258, quality: 75) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    }

    #peopleGallery: allFile (
    #  filter: { absolutePath: { regex: "/\/about-us\/assets\/people\//" } }
    #) {
    #  edges {
    #    node {
    #      image: childImageSharp {
    #        resolutions(width: 258, height: 258, quality: 75) {
    #          ...GatsbyImageSharpResolutions
    #        }
    #      }
    #    }
    #  }
    #}
  }
`