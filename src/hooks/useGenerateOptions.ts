import { useState } from 'preact/hooks'

import { LIBRARY_NAME } from '@consts/config'

export function useGenerateOptions() {
  const [delimiter, setDelimiter] = useState<Delimiter>('.')
  // Nothing preselected: every option has side effects in the Penpot file
  const [libraryMode, setLibraryMode] = useState(false)
  const [jsonMode, setJsonMode] = useState(false)
  const [visualPaletteMode, setVisualPaletteMode] = useState(false)
  const [tokensMode, setTokensMode] = useState(false)
  const [targetSet, setTargetSet] = useState('')
  const [newSetName, setNewSetName] = useState(LIBRARY_NAME)

  return {
    libraryMode,
    jsonMode,
    visualPaletteMode,
    tokensMode,
    targetSet,
    newSetName,
    delimiter,
    setLibraryMode,
    setJsonMode,
    setVisualPaletteMode,
    setTokensMode,
    setTargetSet,
    setNewSetName,
    setDelimiter,
  }
}
