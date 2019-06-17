import React, { Component, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors, media, SIZE } from '@src/theme'
import { faLink, faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faTwitterSquare,
  faGooglePlusSquare,
} from '@fortawesome/free-brands-svg-icons'
import { PureButton } from '@components/layout/Button'
import { toast } from '../utils/toast'

const Container = styled.div({
  [media.greaterThan(SIZE.xsmall)]: {
    display: `flex`,
    alignItems: `center`,
    flexDirection: `column`,
  },
})
const ContainerInner = styled.div({
  display: `flex`,
  alignItems: `center`,
})

const Title = styled.h4({
  fontSize: `1.5rem`,
  margin: 0,
  marginRight: `2rem`,
  [media.lessThan(SIZE.xsmall)]: { marginBottom: `1rem` },
})

const Button = styled(PureButton)`
  background-color: ${colors.transparent};
  border: 0;
  margin-left: 1rem;
  padding: 0.4rem 0.7rem;
`

const LinkWrapper = styled.div`
  background: ${colors.creme};
  border: 1px solid ${colors.gray5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
`

const LinkLabel = styled.span`
  white-space: nowrap;
  color: ${colors.gray};
`
const StyledA = styled.a`
  border: none;
`
const InvisibleInput = styled.input`
  margin-left: 0.7rem;
  background-color: ${colors.transparent};
  border: none;
  width: 100%;
`

const LinkModal = styled.div`
  background: ${colors.white};
  padding: 0.5rem 1rem;
  min-width: 300px;
  max-width: 99%;
  max-width: 99vw;
  width: 80%;
`

const LinkModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${colors.gray};
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
`

/**
 * if we improve onDoubleClick
 * https://gist.github.com/MoOx/12726d85a3343d84ee3c
 * https://stackoverflow.com/questions/49187412/handle-react-ondoubleclick-and-single-onclick-for-same-element
 */
function ShareWidget({
  label,
  getFullUrlLabel,
  copyLabel,
  linkLabelShort,
  linkLabelFull,
  shareUrlSuccessLabel,
  shareUrlErrorLabel,
  post,
  siteUrl,
}: ShareWidgetProps) {
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [showFullUrl, setShowFullUrl] = useState(false)

  const linkInputRef = useRef<HTMLInputElement>()

  const getLink = () =>
    siteUrl + (showFullUrl ? post.fields.url : post.fields.slug_short)

  const onLinkModalButtonClick = ({ metaKey }: { metaKey: boolean }) =>
    metaKey ? copyToClipboard() : toggleLinkModal()

  const toggleLinkModal = () => setLinkModalOpen(!linkModalOpen)

  const toggleLink = () => setShowFullUrl(!showFullUrl)

  const onClickLinkInput = () => {
    if (linkInputRef.current) linkInputRef.current.select()
  }
  const copyToClipboard = () => {
    /* globals document */
    // let shareUrlInput = document.getElementById(`share-url`)
    let shareUrlInput = linkInputRef.current
    let inputShouldBeRemoved = false
    try {
      if (!shareUrlInput) {
        shareUrlInput = document.createElement(`textarea`)
        shareUrlInput.value = getLink()
        document.getElementById(`sharewidget`).appendChild(shareUrlInput)
        inputShouldBeRemoved = true
      }
      shareUrlInput.focus()
      shareUrlInput.select()

      if (document.execCommand(`copy`)) {
        toast.success(shareUrlSuccessLabel)
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error(shareUrlErrorLabel)
    }
    if (inputShouldBeRemoved) {
      shareUrlInput.remove()
    }
  }

  const { title, tweet_id, lang } = post.frontmatter
  const link = siteUrl + post.fields.url
  const shortLink = siteUrl + post.fields.slug_short

  return (
    <Container id="sharewidget" {...props}>
      {label && <Title>{label}</Title>}

      <ContainerInner>
        <div
          css={css`
            & svg {
              color: ${colors.brands.facebook};
              margin-right: 1rem;
            }
          `}
        >
          <StyledA
            href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(
              link
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share via Facebook"
          >
            <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          </StyledA>
        </div>
        <div
          css={css`
            & svg {
              color: ${colors.brands.twitter};
              margin: 0 1rem;
            }
          `}
        >
          <StyledA
            href={
              tweet_id
                ? `https://twitter.com/intent/retweet?tweet_id=${encodeURIComponent(
                    tweet_id
                  )}`
                : `http://twitter.com/share?text=${encodeURIComponent(
                    title
                  )}&url=${encodeURIComponent(shortLink)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            title="Share via Twitter"
          >
            <FontAwesomeIcon icon={faTwitterSquare} size="lg" />
          </StyledA>
        </div>
        <div
          css={css`
            & svg {
              color: ${colors.brands.gplus};
              margin: 0 1rem;
            }
          `}
        >
          <StyledA
            href={`https://plus.google.com/share?url=${encodeURIComponent(
              link
            )}&hl=${encodeURIComponent(lang)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share via Google+"
          >
            <FontAwesomeIcon icon={faGooglePlusSquare} size="lg" />
          </StyledA>
        </div>
        <div
          css={css`
            & svg {
              color: ${colors.primaryLite};
              margin: 1rem;
            }
          `}
        >
          <StyledA
            href={`mailto:?body=${encodeURIComponent(
              link
            )}&subject=${encodeURIComponent(title)}`}
            rel="noopener noreferrer"
            title="Share via Mail"
          >
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </StyledA>
        </div>

        <div
          css={css`
            & svg {
              color: ${colors.link};
            }
          `}
        >
          <Button
            aria-label="Copy Link"
            onClick={onLinkModalButtonClick}
            onDoubleClick={copyToClipboard}
          >
            <FontAwesomeIcon icon={faLink} size="lg" />
          </Button>
        </div>
      </ContainerInner>

      {linkModalOpen && (
        <LinkModal>
          <LinkModalHeader>
            <Label>
              <Checkbox type="checkbox" onClick={toggleLink} />
              <span>{getFullUrlLabel}</span>
            </Label>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggleLinkModal}
              css={css`
                color: ${colors.gray3};
              `}
            />
          </LinkModalHeader>
          <LinkWrapper>
            <LinkLabel onClick={onClickLinkInput}>
              {showFullUrl ? linkLabelFull : linkLabelShort}
            </LinkLabel>
            <InvisibleInput
              id="share-url"
              type="text"
              value={showFullUrl ? link : shortLink}
              readOnly
              onClick={onClickLinkInput}
              innerRef={linkInputRef}
            />
            <Button onClick={copyToClipboard}>{copyLabel}</Button>
          </LinkWrapper>
        </LinkModal>
      )}
    </Container>
  )
}

interface ShareWidgetProps {
  label: string
  getFullUrlLabel: string
  copyLabel: string
  linkLabelShort: string
  linkLabelFull: string
  shareUrlSuccessLabel: string
  shareUrlErrorLabel: string
  post: {
    frontmatter: {
      title: string
      tweet_id: string
      lang: string
    }
    fields: {
      url: string
      slug_short: string
    }
  }
  siteUrl: string
}

export default ShareWidget
