import React from 'react'
import icons from './icons'

export default class SocialProfileIcon extends React.Component {
  render () {
    const { title, iconPicker, socialUrl, id } = this.props.atts
    let customProps = {}
    let CustomTag = 'span'
    const classes = 'vce-social-profile-icon'
    const iconName = iconPicker.icon.split('vcv-ui-icon-socials-')[1]
    const svg = icons(iconName, id)
    const { url, relNofollow, targetBlank } = socialUrl

    if (url) {
      CustomTag = 'a'
      customProps = {
        href: url,
        title: socialUrl.title || title,
        target: targetBlank ? '_blank' : undefined,
        rel: relNofollow ? 'nofollow' : undefined
      }
    }

    return <CustomTag className={classes} {...customProps} dangerouslySetInnerHTML={{ __html: svg }} />
  }
}
