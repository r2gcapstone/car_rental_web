import { components } from './components'
import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'

const overrides = {
  colors,
  components
}

export const theme = extendTheme(overrides)
