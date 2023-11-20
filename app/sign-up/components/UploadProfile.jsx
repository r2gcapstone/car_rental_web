import { useState } from 'react'
import { useGetRegistration } from 'services/zustandVariables'
import { shallow } from 'zustand/shallow'
import { Image, Button, Flex, Text, Input, Box } from '@chakra-ui/react'
import { uploadNewImage } from 'helpers'
import { useAccount } from 'lib'
import { ChangeEvent } from 'react'

export const UploadProfile = () => {
  const { uploadAvatar } = useAccount()
  const [state, setState] = useState<{ rawImage: File[]; preview: string }>({
    rawImage: [],
    preview: ''
  })
  const response = useGetRegistration((state) => ({ ...state }), shallow)

  const uploadUserAvatar = (): void => {
    uploadAvatar(response.authId, state.rawImage)
  }

  const onUploadChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { rawImage, preview } = uploadNewImage(e)

    if (rawImage.length > 0) {
      setState({ rawImage, preview })
    }
  }

  const handleSkip = (): void => {
    response?.updateRegistration({
      email: response?.email,
      authId: response?.authId,
      step: 'success',
      loading: false
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
        aria-label='user-avatar'
        rounded='full'
      />

      <Box position='relative'>
        <Button
          type='button'
          onClick={uploadUserAvatar}
          variant='primary'
          fontSize='1rem'
          mt='4'
          width={200}
        >
          {state.preview ? 'set image' : 'Upload image'}
        </Button>
        {!state.preview && (
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
            onChange={(e) => onUploadChange(e)}
          />
        )}
      </Box>
      <Text>Or</Text>
      <Text cursor='pointer' onClick={handleSkip}>
        Skip for now
      </Text>
    </Flex>
  )
}
