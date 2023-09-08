import React from 'react'
import classNames from 'classnames'

export default class ProFaqItem extends React.Component {
  render () {
    const { atts, id } = this.props
    const { title, textBlock } = atts
    let containerClasses = ['vce-faq-group-item']

    containerClasses = classNames(containerClasses)

    const tabId = `tab-${id}`
    const panelId = `panel-${id}`
    const ariaHidden = true
    const ariaExpanded = false
    const ariaSelected = false

    return (
      <div className={containerClasses}>
        <div className='vce-faq-group-item-heading' role='tab' id={tabId} aria-controls={panelId} aria-expanded={ariaExpanded} aria-selected={ariaSelected}>
          <h3 className='vce-faq-group-item-heading-title'>{title}</h3>
          <div className='vce-faq-group-item-icon' />
        </div>
        <div className='vce-faq-group-item-content' role='tabpanel' id={panelId} aria-labelledby={tabId} aria-hidden={ariaHidden}>
          {textBlock}
        </div>
      </div>
    )
  }
}
