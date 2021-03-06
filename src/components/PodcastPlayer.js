import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PureButton } from '@/components/layout/Button'
import { colors, media } from '@/theme'
import styled from 'react-emotion'

const Button = styled(PureButton)({
  margin: `0 1rem`,
  border: `none`,
  background: `transparent`,
  color: colors.darkWhite,
  fontWeight: `500`,
  padding: 0,
  '&:hover': {
    transform: `scale(1.04)`,
  },
  '& span': {
    padding: 0,
  },
})

const OnMobile = styled.span({
  [media.greaterThan(`medium`)]: { display: `none` },
})
const OnDesktop = styled.span({
  [media.lessThan(`medium`)]: {
    display: `none`,
  },
})

class PodcastPlayer extends Component {
  static propTypes = {
    podcast: PropTypes.object,
    meta: PropTypes.object,
  }
  static defaultProps = {
    podcast: {},
    meta: {},
  }
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      current: ``,
      isVideo: false,
    }
  }

  setCurrent = (url, isVideo) => () => {
    const { current } = this.state

    this.setState({
      current: current === url ? `` : url,
      isOpen: current === url ? false : true,
      isVideo,
    })
  }

  render() {
    if (!this.props.podcast) return null

    const {
      podcast: { audio, video },
      meta,
    } = this.props
    const { isOpen, current, isVideo } = this.state

    return (
      <div>
        <div
          css={{
            margin: `2rem auto 0`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            color: colors.darkWhite,
            background: [
              colors.primary,
              `linear-gradient(90deg, ${colors.white}, ${colors.primary} 15%, ${
                colors.primary
              } 85%, ${colors.white})`,
            ],
            [media.greaterThan(`small`)]: {
              background: [
                colors.primary,
                `linear-gradient(90deg, ${colors.white}, ${colors.primary}, ${
                  colors.white
                })`,
              ],
            },
            [media.greaterThan(`medium`)]: {
              width: `840px`,
            },
          }}
        >
          <div css={{ marginRight: `.5rem` }}>
            <OnMobile>{meta.short}</OnMobile>
            <OnDesktop>{meta.long}</OnDesktop>
          </div>
          <Button onClick={this.setCurrent(audio, false)}>Audio</Button>
          <Button onClick={this.setCurrent(video, true)}>Video</Button>
        </div>

        {isOpen && (
          <div
            css={{
              margin: `1rem auto 0`,
              position: `relative`,
              overflow: `hidden`,
              paddingTop: isVideo && `56.25%`,
              height: !isVideo && `102px`,
              [media.greaterThan(`medium`)]: {
                width: `760px`,
                paddingTop: isVideo && `36.25%`,
              },
            }}
          >
            <iframe
              src={current}
              title="Podcast"
              frameBorder="0"
              scrolling="no"
              css={{
                position: `absolute`,
                top: `0`,
                left: `0`,
                width: `100%`,
                height: `100%`,
                border: `0`,
              }}
            />
          </div>
        )}
      </div>
    )
  }
}

export default PodcastPlayer

export const fragment = graphql`
  fragment PodcastPlayer on Query {
    PodcastPlayerMeta: podcastPlayerAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        short
        long
      }
    }
  }
`
