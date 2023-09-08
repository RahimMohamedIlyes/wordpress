import { getStorage, getService } from 'vc-cake'
import premiumLibs from './public/src/premiumLibs'
import Parallax from './public/src/parallax'
import ParallaxBackgroundAnimationComponent from './public/src/parallaxBackgroundAnimationComponent'

const cook = getService('cook')
const fieldOptionsStorage = getStorage('fieldOptions')
const elementsSettingsStorage = getStorage('elementsSettings')
const assetsStorage = getStorage('assets')

const extraFieldKeys = ['parallax']
const PremiumParallax = new Parallax()

function applyExtraOption (data) {
  if (extraFieldKeys.includes(data.fieldType)) {
    if (data.fieldType === 'parallax') {
      PremiumParallax.handleParallaxOptions(data)
    }
  }
}

function updateStorageLibNames () {
  let storageLibs = assetsStorage.state('attributeLibs').get()
  if (!storageLibs) {
    storageLibs = premiumLibs
  } else {
    storageLibs = [storageLibs, ...premiumLibs]
  }
  assetsStorage.state('attributeLibs').set(storageLibs)
}

function setAssetsLibrary (options) {
  const storageState = elementsSettingsStorage.state('extendedOptions').get()
  const stateElements = storageState && storageState.elements ? storageState.elements : []
  const stateElementIndex = stateElements.findIndex((element) => {
    return element.id === options.id
  })
  if (stateElementIndex < 0) {
    stateElements.push(options)
  } else {
    stateElements[ stateElementIndex ].id = options.id
    stateElements[ stateElementIndex ].fieldKey = options.fieldKey
    stateElements[ stateElementIndex ].fieldType = options.fieldType
  }
  elementsSettingsStorage.state('extendedOptions').set({
    elements: stateElements,
    backgroundAnimationComponent: ParallaxBackgroundAnimationComponent
  })
}

function handleInitialLoad (options) {
  let fieldKey = ''
  let fieldType = ''
  const atts = cook.getById(options.id).getAll()
  const { id } = options
  extraFieldKeys.forEach((key) => {
    if (key === 'parallax' && atts[ key ]) {
      fieldKey = key
      fieldType = key
      setAssetsLibrary({ fieldKey, fieldType, id })
    }
  })
}

function init () {
  updateStorageLibNames()
  fieldOptionsStorage.on('fieldOptions', (optionName, options) => {
    // Remove disabled items
    options.values = options.values.filter(lib => !lib.disabled)

    const attrOptions = premiumLibs.filter(lib => optionName === lib.fieldKey)
    options.values.push(...attrOptions)
    fieldOptionsStorage.state('currentAttribute:settings').set(options)
  })
  fieldOptionsStorage.on('fieldOptionsChange', (options) => {
    if (extraFieldKeys.includes(options.fieldType)) {
      setAssetsLibrary(options)
    } else {
      handleInitialLoad(options)
    }
  })
  elementsSettingsStorage.state('elementOptions').onChange(applyExtraOption)
}

init()
