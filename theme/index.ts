import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'

const overrides = {
  colors
}

export const theme = extendTheme(overrides)
