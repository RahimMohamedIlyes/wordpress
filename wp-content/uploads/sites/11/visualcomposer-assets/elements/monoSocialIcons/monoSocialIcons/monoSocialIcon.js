import React from 'react'

export default class MonoSocialIcon extends React.Component {
  render () {
    const { title, iconPicker, socialUrl, shape } = this.props.atts
    let customProps = {}
    let CustomTag = 'span'
    const classes = `${iconPicker.icon}`
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

    let HexagonIcon = null
    if (shape === 'filled-hexagon' || shape === 'outlined-hexagon') {
      HexagonIcon = (
        <svg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 769 769'>
          <path strokeWidth='25' d='M565.755 696.27h-360l-180-311.77 180-311.77h360l180 311.77z' />
        </svg>
      )
    }

    return (
      <div className='vce-mono-social-icons-profile-icon'>
        {HexagonIcon}
        <CustomTag className={classes} {...customProps} />
      </div>
    )
  }
}
