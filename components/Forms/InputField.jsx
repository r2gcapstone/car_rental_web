import { forwardRef } from 'react'
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  InputProps
} from '@chakra-ui/react'

const InputField = forwardRef(function InputField(
  {
    label,
    inputProps,
    isError = false,
    errorMessage,
    labelWeight = 'bold',
    labelSize = '1.375rem',
    ...rest
  },
  ref
) {
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
})

export default InputField
