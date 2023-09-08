import React from 'react'
import { getService } from 'vc-cake'

const dataProcessService = getService('dataProcessor')

export default class ImportForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      importing: false,
      statusMessages: [],
      importingDone: false,
      importRequestDone: false,
      errorMessage: ''
    }

    this.handleImportClick = this.handleImportClick.bind(this)
  }

  componentWillUnmount () {
    this.serverProgressRequest.cancelled = true
    this.serverImportRequest.cancelled = true
  }

  handleImportClick (e) {
    e && e.preventDefault()

    const fileInput = document.querySelector('input[name="vcv-file-id"]')
    const fileId = fileInput && fileInput.value

    if (!fileId) {
      return
    }

    this.setState({ importing: true })

    const startImportInner = document.querySelector('.vcv-start-import-inner')
    startImportInner.outerHTML = ''

    this.createServerImportRequest(fileId)

    const _this = this
    const intervalID = window.setInterval(() => {
      if (_this.initialMediaUploadLength === undefined) {
        return
      }

      const localizations = window.VCV_I18N && window.VCV_I18N()
      const skipImportMedia = localizations && localizations.skipImportMedia ? localizations.skipImportMedia : 'The server cannot process some media files. This can happen if the the server is busy or does not have enough resources to complete the task. Right now we skipped problem medias. But you can increase server resources and try to import again. List of medias that have issue below'

      if (_this.initialMediaUploadLength === _this.currentMediaUploadLength) {
        _this.currentMediaUploadCounter = _this.currentMediaUploadLength
      // we have some media that can't be processed
      } else if (_this.currentMediaUploadCounter === _this.currentMediaUploadLength && _this.mediaListToProcess.length !== 0) {
        const newState = { importRequestDone: true }
        let errorMessage = skipImportMedia
        for (const mediaData of _this.mediaListToProcess) {
          errorMessage += ' <br>' + mediaData.uploadPath
        }
        newState.errorMessage = errorMessage
        _this.setState(newState)
        _this.setState({ importingDone: true })

        clearInterval(intervalID)
      } else {
        _this.currentMediaUploadCounter = _this.currentMediaUploadLength
      }
    }, 180000)
  }

  getJsonFromString = (string) => {
    const regex = /(\{"\w+".*\})/g
    const result = string.match(regex)
    if (result) {
      return result[0]
    }
    return false
  }

  createServerImportRequest (fileId) {
    this.serverImportRequest = dataProcessService.appAdminServerRequest({
      'vcv-action': 'vcv:addon:exportImport:beginImport:adminNonce',
      'vcv-nonce': window.vcvNonce,
      'vcv-time': window.vcvAjaxTime,
      'vcv-file-id': fileId
    }).then((result) => {
      if (this.serverImportRequest && this.serverImportRequest.cancelled) {
        this.serverImportRequest = null
        return
      }
      let response
      try {
        response = JSON.parse(result)

        this.templateName = response.templateName
        this.templateLink = response.templateLink
      } catch (e) {
        console.warn('Failed to parse, no valid json.', e)
        const jsonString = this.getJsonFromString(result)
        response = JSON.parse(jsonString)
      }

      const newState = { importRequestDone: true }
      const errorMessage = response && response.message
      if (errorMessage) {
        newState.errorMessage = errorMessage
      }
      this.setState(newState)

      const statusMessages = response && response.statusMessages
      if (statusMessages) {
        this.setState({ statusMessages })
      }

      const localizations = window.VCV_I18N && window.VCV_I18N()
      const importUpdatingMediaProcess = localizations && localizations.importUpdatingMediaProcess ? localizations.importUpdatingMediaProcess : 'Updating media data...'
      const importMediaUpdateLeft = localizations && localizations.importMediaUpdateLeft ? localizations.importMediaUpdateLeft : 'files left'

      if (response.mediaListToProcess.length !== 0) {
        this.initialMediaUploadLength = response.mediaListToProcess.length
        statusMessages.push(importUpdatingMediaProcess + ' <strong class="vcv-media-update-count">' + response.mediaListToProcess.length + '</strong> ' + importMediaUpdateLeft)
        this.setState({ statusMessages })

        this.mediaListToProcess = response.mediaListToProcess

        for (const mediaData of response.mediaListToProcess) {
          this.parallelMediaUpdate(mediaData)
        }
      } else {
        this.setState({ importingDone: true })
      }
    })
  }

  async parallelMediaUpdate (mediaData, mediaListToProcess) {
    await new Promise(resolve => {
      this.updateSingleMediaData(mediaData.mediaId, mediaData.uploadPath)
    })
  }

  updateSingleMediaData (mediaId, uploadPath) {
    this.serverProgressRequest = dataProcessService.appAdminServerRequest({
      'vcv-action': 'vcv:addon:exportImport:generateAttachmentMeta:adminNonce',
      'vcv-nonce': window.vcvNonce,
      'vcv-time': window.vcvAjaxTime,
      'vcv-media-id': mediaId,
      'vcv-upload-path': uploadPath
    }).then((result) => {
      if (this.serverProgressRequest && this.serverProgressRequest.cancelled) {
        this.serverProgressRequest = null
        return
      }

      const currentCounterElement = document.getElementsByClassName('vcv-media-update-count')

      if (currentCounterElement[0]) {
        let currentCounter = parseInt(currentCounterElement[0].innerHTML)

        currentCounter = currentCounter - 1
        currentCounterElement[0].innerHTML = currentCounter

        if (currentCounter === 0) {
          this.setState({ importingDone: true })
        }
      }

      // our media processed successfully now we can remove it from queue process list
      for (const mediaData of this.mediaListToProcess) {
        if (mediaId === mediaData.mediaId) {
          this.mediaListToProcess.splice(this.mediaListToProcess.indexOf(mediaData), 1)
          this.currentMediaUploadLength = this.mediaListToProcess.length
        }
      }
    })
  }

  getBackButton () {
    const localizations = window.VCV_I18N && window.VCV_I18N()
    const backToImportText = localizations && localizations.backToImport ? localizations.backToImport : 'Back to import'
    const importDoneText = localizations && localizations.importDoneText ? localizations.importDoneText : 'Import Done. Go to '
    return (
      <p className='description'>
        <p className='description'>{importDoneText} <a href={this.templateLink}>{this.templateName}</a></p>
        <a href={window.vcvBackToImportLink} key='vcvGoBackButton'>{backToImportText}</a>
      </p>
    )
  }

  getStatusMessages () {
    const localizations = window.VCV_I18N && window.VCV_I18N()
    const startImportProcessText = localizations ? localizations.startingImportProcess : 'Starting import process...'

    const messages = []
    messages.push(<p key='vcvImportStatusFirstMessage' className='description'>{startImportProcessText}</p>)
    this.state.statusMessages.forEach((message, index) => {
      messages.push(<p key={`vcvImportStatusMessage${index}`} className='description' dangerouslySetInnerHTML={{ __html: message }} />)
    })
    if (this.state.errorMessage) {
      messages.push(<p key='vcvImportErrorMessage' className='description'><strong dangerouslySetInnerHTML={{ __html: this.state.errorMessage }} /></p>)
    }

    if (this.state.importingDone) {
      messages.push(this.getBackButton())
    }

    return messages
  }

  render () {
    const localizations = window.VCV_I18N && window.VCV_I18N()
    const continueImportText = localizations ? localizations.continueImport : 'Continue importing'

    const importButtons = (
      <>
        <p className='submit'>
          <input type='submit' name='submit' id='vcv-submit' className='button vcv-dashboard-button vcv-dashboard-button--save vcv-dashboard-button--inline' value={continueImportText} onClick={this.handleImportClick} />
        </p>
      </>
    )

    return this.state.importing ? this.getStatusMessages() : importButtons
  }
}
