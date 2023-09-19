import { forwardRef } from 'react'
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  InputProps
} from '@chakra-ui/react'

interface InputFieldPropTyps extends InputProps {
  label?: string
  inputProps?: InputProps
  isError?: boolean
  errorMessage?: string
  labelWeight?: string
  labelSize?: string
}

type Ref = HTMLInputElement

export const InputField = forwardRef<Ref, InputFieldPropTyps>(
  function InputField(props, ref) {
    const {
      label,
      inputProps,
      isError = false,
      errorMessage,
      labelWeight = 'bold',
      labelSize = '1.375rem',
      ...rest
    } = props

    return (
      <FormControl isInvalid={isError} flexDirection='column' gap='2'>
        <FormLabel fontWeight={labelWeight} fontSize={labelSize} color='white'>
          {label}
        </FormLabel>
        <Input
          ref={ref}
          bg='blue.lightblue'
          {...rest}
          {...inputProps}
          rounded='xl'
        />
        <FormErrorMessage
          aria-label='error-message'
          role='alert'
          color='red.300'
          fontSize='sm'
          lineHeight='4'
          whiteSpace='pre-wrap'
          mt='2'
        >
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    )
  }
)
