import React, { useRef } from 'react';
import { TextProps, Tooltip } from '@chakra-ui/react';
import { useTruncateText } from '../../lib';

const TooltipText = ({ text, enablePointerEvents = true }) => {
  const textRef = useRef(null);

  const { truncateText } = useTruncateText(textRef, text);

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
          cursor: enablePointerEvents ? 'pointer' : 'default',
          maxLines: '1',
        }}
      >
        {text}
      </span>
    </Tooltip>
  );
};

export default TooltipText;
