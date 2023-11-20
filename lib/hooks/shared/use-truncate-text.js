import { useState, useEffect } from 'react';

export const useTruncateText = (ref, text) => {
  const [truncateText, setTruncateText] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const isCheckTruncate =
      element &&
      (element.scrollWidth > element.clientWidth ||
        (element.scrollWidth === 0 && element.clientWidth === 0));

    setTruncateText(Boolean(isCheckTruncate));
  }, [ref, text?.length]);

  return {
    truncateText,
  };
};
