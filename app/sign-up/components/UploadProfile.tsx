import { useState } from 'react'
import { useGetRegistration } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { Image, Button, Flex, Text, Input, Box } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

export const UploadProfile: React.FC = () => {
  const [state, setState] = useState<{ rawImage: FileList[]; preview: string }>(
    { rawImage: [], preview: '' }
  )
  const response = useGetRegistration((state) => ({ ...state }), shallow)

  const onUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files as FileList

    if (file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0])
      setState({ rawImage: [file], preview: objectUrl })
    }
  }

  const handleSkip = (): void => {
    response?.updateRegistration({
      email: response?.email,
      authId: response?.authId,
      step: 'success'
    })
  }

  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='0.5rem'
    >
      <Image
        src={state.preview || '/image/avatar.jpg'}
        width={200}
        height={200}
        objectFit='cover'
        alt='user avatar'
        rounded='full'
      />

      <Box position='relative'>
        <Button variant='primary' fontSize='1rem' mt='4' width={200}>
          {state.preview ? 'set image' : 'Upload image'}
        </Button>
        <Input
          type='file'
          height='100%'
          width='100%'
          position='absolute'
          top='0'
          left='0'
          opacity='0'
          aria-hidden='true'
          accept='image/*'
          cursor='pointer'
          display={!!state.preview ? 'none' : 'block'}
          onChange={(e) => onUploadChange(e)}
        />
      </Box>
      <Text>Or</Text>
      <Text cursor='pointer' onClick={handleSkip}>
        Skip for now
      </Text>
    </Flex>
  )
}
