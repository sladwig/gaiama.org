import { graphql } from 'gatsby'

export const Fragments = graphql`
  fragment siteData on Query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }

  fragment SiteMeta on Query {
    SiteMeta: siteMetaMarkdown(frontmatter: { lang: { eq: $lang } }) {
      htmlAst
      frontmatter {
        assets {
          logo {
            image: childImageSharp {
              fluid(maxWidth: 420, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          headerBg {
            image: childImageSharp {
              fluid(maxWidth: 1440, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          paypalButton {
            publicURL
          }
          globalCover {
            publicURL
          }
        }
        skipLinks {
          toContent
          toNav
        }
        footer {
          menuTitle
          socialTitle
          supportTitle
        }
      }
    }
  }

  fragment languages on Query {
    languages: allLanguagesAml {
      edges {
        node {
          frontmatter {
            id
            title
            titleShort
            lc
          }
        }
      }
    }
  }

  fragment Accounts on Query {
    Accounts: accountsAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        accounts {
          service
          name
          description
          handle
          url
          icon
          meta
        }
      }
    }
  }

  fragment menu on Query {
    menu: allJavascriptFrontmatter(
      filter: {
        frontmatter: { menu: { regex: "/(main|meta)/" }, lang: { eq: $lang } }
      }
      sort: { fields: [frontmatter___menuorder], order: ASC }
    ) {
      edges {
        node {
          fields {
            url
          }
          frontmatter {
            title
            titleShort
            menu
            slug
            lang
          }
        }
      }
    }
  }

  fragment homepage on Query {
    homepage: javascriptFrontmatter(
      frontmatter: { lang: { eq: $lang }, layout: { eq: "HomePage" } }
    ) {
      fields {
        url
      }
      frontmatter {
        lang
        title
        slug
        header {
          title
          subtitle
        }
      }
    }
  }

  fragment legal on Query {
    legal: allJavascriptFrontmatter(
      filter: { frontmatter: { lang: { eq: $lang }, menu: { eq: "legal" } } }
    ) {
      edges {
        node {
          fields {
            url
          }
          frontmatter {
            lang
            title
          }
        }
      }
    }
  }
`
