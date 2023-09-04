import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
  ModalHeaderProps,
  Flex,
  Text,
  Icon
} from '@chakra-ui/react'
import { CloseIcon } from 'components'

interface ModalContainerProps extends ModalProps {
  title?: string
  withTitleBorder?: boolean
  contentWidth?: string | number
  modalHeaderProps?: ModalHeaderProps
  overflow?: string
  modalHeight?: string
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  withTitleBorder = true,
  contentWidth = '',
  children,
  modalHeaderProps,
  overflow = 'hidden',
  modalHeight,
  ...rest
}) => {
  const { onClose } = rest

  return (
    <Modal size='2xl' isCentered {...rest} autoFocus={false}>
      <ModalOverlay />
      <ModalContent
        bg='blue.dark'
        p='0'
        transition='max-width 0.4s ease-in-out'
        borderRadius='lg'
        {...(contentWidth ? { maxW: contentWidth } : {})}
        overflow={overflow}
        position='fixed'
        maxHeight={modalHeight}
      >
        {title && !modalHeaderProps && (
          <ModalHeader
            pt='5'
            fontSize='sm'
            fontWeight='semibold'
            textTransform='uppercase'
          >
            <Flex
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Text fontSize='1rem'>{title}</Text>
              <Icon cursor='pointer' as={CloseIcon} onClick={onClose} />
            </Flex>
          </ModalHeader>
        )}

        {title && modalHeaderProps && (
          <ModalHeader
            textTransform='uppercase'
            fontWeight='semibold'
            fontSize='sm'
            borderBottom={withTitleBorder ? '1px solid' : '0px'}
            borderColor='gray.0'
            {...modalHeaderProps}
          >
            <Text color={modalHeaderProps.color || 'gray.7'}>{title}</Text>
          </ModalHeader>
        )}
        <ModalBody p='0'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
