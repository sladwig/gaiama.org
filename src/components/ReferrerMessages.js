import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from '@/utils/toast'

// TODO move messages to /content
const messages = {
  en: {
    'happygaia.com': `HappyGaia is now GaiAma`,
    subscribed: `Thanks for having successfully subscribed to our newsletter :-)`,
    unsubscribed: `You've been successfully unsubscribed from our newsletter :-)`,
  },
  de: {
    'happygaia.com': `HappyGaia ist jetzt GaiAma`,
    subscribed: `Du hast dich erfolgreich für unseren Newsletter angemeldet, vielen Dank :-)`,
    unsubscribed: `Du wurdest erfolgreich von unserem Newsletter abgemeldet :-)`,
  },
}

class ReferrerMessages extends Component {
  componentDidMount() {
    const {
      urlParams: { ref },
      lang,
    } = this.props
    if (messages[lang][ref]) {
      toast.success(messages[lang][ref])
    }
  }

  render() {
    const {
      urlParams: { ref },
      lang,
      ...props
    } = this.props

    const message = messages[lang][ref]
    if (!message) return null

    return (
      <div
        css={{
          fontWeight: 500,
          letterSpacing: `.03rem`,
          padding: `.5rem 1rem`,
          textAlign: `center`,
        }}
        {...props}
      >
        {message}
      </div>
    )
  }
}
ReferrerMessages.propTypes = {
  urlParams: PropTypes.shape({
    ref: PropTypes.string,
  }),
  lang: PropTypes.string,
}

export default ReferrerMessages
