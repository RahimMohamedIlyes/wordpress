(function (window, $) {
  const showConfirmationMessage = function (formElement) {
    const messageContainer = formElement.querySelector('.vce-simple-contact-form-confirmation-message')
    if (messageContainer) {
      messageContainer.style.display = 'block'
    }
    const form = formElement.querySelector('form')
    form && form.reset && form.reset()
  }

  const showErrorMessage = function (formElement, text) {
    const messageContainer = formElement.querySelector('.vce-simple-contact-form-error-message')
    if (messageContainer) {
      messageContainer.style.display = 'block'

      if (text) {
        const textElement = messageContainer.querySelector('.vce-message-box-text')
        if (textElement) {
          textElement.innerText = text
        }
      }
    }
  }

  const removeMessages = function (formElement) {
    const confirmationMessage = formElement.querySelector('.vce-simple-contact-form-confirmation-message')
    const errorMessage = formElement.querySelector('.vce-simple-contact-form-error-message')

    if (confirmationMessage) {
      confirmationMessage.style.display = 'none'
    }

    if (errorMessage) {
      errorMessage.style.display = 'none'
    }
  }

  const removeLoading = function (button) {
    button.style.position = ''
    button.style.pointerEvents = ''
    const loader = button.querySelector('.vce-simple-contact-form-loader')
    if (loader) {
      loader.parentNode.removeChild(loader)
    }
  }

  const setLoading = function (button) {
    const loader = document.createElement('span')
    loader.classList = 'vce-simple-contact-form-loader'
    button.style.position = 'relative'
    button.style.pointerEvents = 'none'
    button.appendChild(loader)
  }

  const disableFields = function (inputs) {
    inputs.forEach((input) => {
      input.disabled = true
    })
  }

  const enableFields = function (inputs) {
    inputs.forEach((input) => {
      input.disabled = false
    })
  }

  const initContactForm = function (formElement) {
    const id = formElement.id.replace('el-', '')
    const button = formElement.querySelector('button')
    const nameInput = formElement.querySelector(`#vce-simple-form--name-${id}`)
    const emailInput = formElement.querySelector(`#vce-simple-form--email-${id}`)
    const sourceIdInput = formElement.querySelector('[name=vcv-source-id]')
    const messageInput = formElement.querySelector(`#vce-simple-form--message-${id}`)

    button.addEventListener('click', (e) => {
      const nameValue = nameInput && nameInput.value
      const emailValue = emailInput && emailInput.value
      const sourceId = sourceIdInput && sourceIdInput.value
      const isEmailValid = (emailInput && emailInput.checkValidity) ? emailInput.checkValidity() : true
      const messageValue = messageInput && messageInput.value
      const subject = formElement.getAttribute('data-vce-simple-contact-form-subject')

      const ajaxUrl = window.VCV_SIMPLE_CONTACT_FORM_AJAX_URL && window.VCV_SIMPLE_CONTACT_FORM_AJAX_URL()
      const nonce = window.VCV_SIMPLE_CONTACT_FORM_USER_NONCE && window.VCV_SIMPLE_CONTACT_FORM_USER_NONCE()

      if (ajaxUrl && nonce && nameValue && emailValue && messageValue && sourceId && isEmailValid) {
        e.preventDefault()
        removeMessages(formElement)
        setLoading(button)
        disableFields([nameInput, emailInput, messageInput])

        const url = `${ajaxUrl}&vcv-nonce=${nonce}`
        $.ajax({
          url: url,
          cache: false,
          data: {
            'vcv-name': nameValue,
            'vcv-email-from': emailValue,
            'vcv-message': messageValue,
            'vcv-subject': subject,
            'vcv-source-id': sourceId,
            'vcv-element-id': id
          },
          dataType: 'html',
          success: function (data) {
            removeLoading(button)
            enableFields([nameInput, emailInput, messageInput])
            try {
              const responseData = JSON.parse(data)
              if (responseData && responseData.status) {
                showConfirmationMessage(formElement)
              } else {
                showErrorMessage(formElement, responseData.message)
                console.warn(responseData.message)
              }
            } catch (err) {
              showErrorMessage(formElement)
              console.warn(err)
            }
          },
          error: function (err) {
            removeLoading(button)
            enableFields([nameInput, emailInput, messageInput])
            showErrorMessage(formElement)
            console.warn('Failed to submit form', err)
          }
        })
      }
    })
  }

  window.vcv.on('ready', function (action, id) {
    if (action || id) {
      return
    }

    const formElements = $('.vce-simple-contact-form-container')
    if (formElements && formElements.length) {
      formElements.each((index, item) => {
        initContactForm(item)
      })
    }
  })
}(window, window.jQuery))
