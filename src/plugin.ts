import { MESSAGES } from '@consts/messages'
import { LIBRARY_NAME } from '@consts/config'

import {
  handleColorLibraryMessage,
  handleGenerateComponentsMessage,
  handleGenerateJsonMessage,
  handleGenerateTokensMessage,
  handleGetTokenSetsMessage,
} from '@plugin/messages'

// Penpot resolves relative URLs against the host origin only, so a build hosted
// under a sub-path (GitHub Pages project site) needs an absolute URL
const UI_URL = `${__PLUGIN_BASE_URL__ || './'}index.html?theme=${penpot.theme}`

penpot.ui.open(LIBRARY_NAME, UI_URL, {
  width: 990,
  height: 600,
})

penpot.on('themechange', (theme) => {
  penpot.ui.sendMessage({
    type: MESSAGES.THEME,
    content: theme
  })
})

penpot.ui.onMessage((message: Message) => {
  switch (message.type) {
    case MESSAGES.GENERATE_COLOR_LIBRARY:
      handleColorLibraryMessage(message)
      break

    case MESSAGES.GENERATE_JSON:
      handleGenerateJsonMessage(message)
      break

    case MESSAGES.GENERATE_COMPONENTS:
      handleGenerateComponentsMessage(message)
      break

    case MESSAGES.GET_TOKEN_SETS:
      handleGetTokenSetsMessage()
      break

    case MESSAGES.GENERATE_TOKENS:
      handleGenerateTokensMessage(message)
      break
  }
})

export {}
