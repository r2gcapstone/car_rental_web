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
import { CloseIcon, NavigateIcon } from 'components'

interface ModalContainerProps extends ModalProps {
  title?: string
  withTitleBorder?: boolean
  contentWidth?: string | number
  modalHeaderProps?: ModalHeaderProps
  overflow?: string
  modalHeight?: string
  showIcon?: boolean
  modalWidth?: string
  background?: string
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  withTitleBorder = true,
  contentWidth = '',
  children,
  modalHeaderProps,
  overflow = 'hidden',
  modalHeight,
  showIcon = false,
  modalWidth = '2xl',
  background = 'blue.dark',
  ...rest
}) => {
  const { onClose } = rest

  return (
    <Modal size={modalWidth} isCentered {...rest} autoFocus={false}>
      <ModalOverlay />
      <ModalContent
        bg={background}
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
              <Flex alignItems='center' gap='2'>
                {showIcon && <Icon as={NavigateIcon} width={50} height={50} />}
                <Text fontSize='1rem'>{title}</Text>
              </Flex>
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
