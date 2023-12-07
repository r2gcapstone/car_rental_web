import { useRef } from 'react'
import { TextProps, Tooltip } from '@chakra-ui/react'
import { useTruncateText } from 'lib'
interface TextWithTooltipProps extends TextProps {
  text: string
  enablePointerEvents?: boolean
}

export const TooltipText: React.FC<TextWithTooltipProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null)

  const { truncateText } = useTruncateText(textRef, text)

  return (
    <Tooltip label={text} isDisabled={!truncateText}>
      <span
        ref={textRef}
        style={{
          color: '#fff',
          width: '15rem',
          height: '1.375rem',
          textAlign: 'left',
          lineHeight: '1.375rem',
          textDecoration: 'none',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          maxLines: '1'
        }}
      >
        {text}
      </span>
    </Tooltip>
  )
}
