import React from 'react'

export default class TimelineWithIconsItem extends React.Component {
  render () {
    const { itemIndex, getMixin, atts } = this.props
    const { description, iconPicker, iconShape, toggleHover, iconUrl, contentPosition, titleFont, titleElementTag, titleFontSize, titleLineHeight, titleLetterSpacing, contentAnimation } = atts
    const { url, title, targetBlank, relNofollow } = iconUrl
    let CustomIconTag = 'span'
    const CustomTitleTag = titleElementTag
    let customIconProps = {}
    const titleProps = {}
    titleProps.style = {}
    let itemClasses = 'vce-timeline-with-icons-item'
    const iconClasses = `vce-timeline-with-icons-item-icon ${iconPicker.icon}`

    let mixin = getMixin('iconColor', itemIndex)
    if (mixin) {
      itemClasses += ` vce-timeline-with-icons-item--color-${mixin.selector}`
    }

    mixin = getMixin('iconBackgroundColor', itemIndex)
    if (mixin) {
      itemClasses += ` vce-timeline-with-icons-item--background-color-${mixin.selector}`
    }

    if (iconShape) {
      itemClasses += ` vce-timeline-with-icons-item--shape-${iconShape}`
    }

    if (toggleHover) {
      mixin = getMixin('iconHoverColor', itemIndex)
      if (mixin) {
        itemClasses += ` vce-timeline-with-icons-item--hover-color-${mixin.selector}`
      }

      mixin = getMixin('iconHoverBackgroundColor', itemIndex)
      if (mixin) {
        itemClasses += ` vce-timeline-with-icons-item--hover-background-color-${mixin.selector}`
      }
    }

    if (contentPosition === 'right') {
      itemClasses += ' vce-timeline-with-icons-item--content-position-right'
    }

    if (url) {
      CustomIconTag = 'a'
      customIconProps = {
        href: url,
        title: title,
        target: targetBlank ? '_blank' : undefined,
        rel: relNofollow ? 'nofollow' : undefined
      }
    }

    if (titleFont && titleFont.status === 'active') {
      const fontStyle = titleFont.fontStyle ? (titleFont.fontStyle.style === 'regular' ? '' : titleFont.fontStyle.style) : null
      titleProps.style.fontWeight = titleFont.fontStyle ? titleFont.fontStyle.weight : null
      titleProps.style.fontStyle = fontStyle
    }

    if (titleFontSize) {
      titleProps.style.fontSize = titleFontSize
    }

    if (titleLineHeight) {
      titleProps.style.lineHeight = titleLineHeight
    }

    if (titleLetterSpacing) {
      titleProps.style.letterSpacing = titleLetterSpacing
    }

    const contentProps = {}

    if (contentAnimation) {
      contentProps['data-vce-animate'] = `vce-o-animate--${contentAnimation}`
      contentProps['data-vcv-animate-fieldkey'] = `timelineItem${itemIndex}Animation`
      contentProps['data-vcv-o-animated'] = 'true'
    }

    return (
      <div className={itemClasses}>
        <div className='vce-timeline-with-icons-item-inner'>
          <div className='vce-timeline-with-icons-item-icon-container'>
            <CustomIconTag className={iconClasses} {...customIconProps} />
          </div>
          <div className='vce-timeline-with-icons-item-content' {...contentProps}>
            <CustomTitleTag className='vce-timeline-with-icons-item-content-title' {...titleProps}>
              {atts.title}
            </CustomTitleTag>
            <div className='vce-timeline-with-icons-item-content-description'>{description}</div>
          </div>
        </div>
      </div>
    )
  }
}
