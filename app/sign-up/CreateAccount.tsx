import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'
import { UploadProfile } from './UploadProfile'
import { RegistrationForm } from './RegistrationForm'

export const CreateAccount: React.FC = () => {
  const renderStep = (type: string): ReactElement | '' => {
    switch (type) {
      case 'registrationForm': {
        return <RegistrationForm />
      }
      case 'uploadProfile': {
        return <UploadProfile />
      }
      default: {
        return ''
      }
    }
  }

  return <Box>{renderStep('registrationForm')}</Box>
}
