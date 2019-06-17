import React, { SFC, useState, ComponentType } from 'react'
// import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import slugify from 'slugify'
import { media, SIZE } from '@src/theme'
import StateProvider from '@components/StateProvider'
import Button from '@root/src/components/layout/Button'

interface ContainerProp {
  centered?: boolean
  full?: boolean
}

const Container = styled.div<ContainerProp>(
  ({ centered = false, full = false }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: centered ? 'center' : 'left',
    [media.greaterThan(SIZE.medium)]: {
      width: full ? '100%' : '81%',
    },
  })
)

interface TitleProp {
  centeredTitle?: boolean
}
const Title = styled.h2<TitleProp>(({ centeredTitle = false }: TitleProp) => ({
  textAlign: centeredTitle ? 'center' : 'left',
}))

interface ContentWrapperProps {
  centeredCopy?: boolean
  spoiler?: boolean
  spoilerOpen?: boolean
}
const ContentWrapper = styled.div<ContentWrapperProps>(
  ({ centeredCopy = false, spoiler = false, spoilerOpen = false }) => ({
    textAlign: centeredCopy ? 'center' : 'left',
    overflow: 'hidden',
    transition: `max-height .3s`,
    maxHeight: spoiler && spoilerOpen ? `100%` : `100px`,
  })
)

const TitledCopy: SFC<TitledCopyProps> = ({
  title,
  rank,
  paragraphs,
  centered,
  centeredTitle,
  centeredCopy,
  full,
  spoiler,
  spoilerLabel,
  state,
  setState,
  children,
  ...props
}) => {
  const [spoilerOpen, setSpoilerOpen] = useState(
    state ? state.spoilerOpen : false
  )
  const content = children || paragraphs
  const slugifiedId =
    title &&
    slugify(Array.isArray(title) ? title.join(` `) : title, {
      remove: /[$*_+~.()'"!\-:@?&]/g,
    })
  const handleClick = () => setSpoilerOpen(!spoilerOpen)

  const rankComponent = rank ? (rank > 6 ? `h6` : `h${rank}`) : `h2`
  const Tag = Title.withComponent((rankComponent as unknown) as ComponentType)

  return (
    <Container centered={centered} full={full} {...props}>
      {title && (
        <Tag id={slugifiedId} centeredTitle={centeredTitle}>
          {Array.isArray(title)
            ? title.map((x, i) => <div key={i}>{x}</div>)
            : title}
        </Tag>
      )}

      {content && (
        <ContentWrapper
          spoiler={spoiler}
          spoilerOpen={spoilerOpen}
          centeredCopy={centeredCopy}
        >
          {Array(content).map((x, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: x as string }} />
          ))}
        </ContentWrapper>
      )}
      {spoiler && !spoilerOpen && (
        <Button onClick={handleClick}>{spoilerLabel}</Button>
      )}
    </Container>
  )
}

interface TitledCopyProps {
  title?: string[] | string
  paragraphs?: string[] | string
  rank?: number | string
  centered?: boolean
  centeredTitle?: boolean
  centeredCopy?: boolean
  full?: boolean
  spoiler?: boolean
  spoilerLabel?: string
  state?: {
    spoilerOpen: boolean
  }
  setState?: () => any
}

export default StateProvider(TitledCopy, { spoilerOpen: false }, {})
