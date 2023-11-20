const Button = {
  baseStyle: {
    borderRadius: 'base',
    fontWeight: 'semibold',
    _disabled: {
      opacity: 0.5
    },
    rounded: 'xl'
  },
  sizes: {
    sm: {
      fontSize: '0.625rem',
      px: 3,
      py: 1.5,
      lineHeight: '0.875rem',
      height: 'unset'
    },
    md: {
      fontSize: '0.625rem',
      px: 4,
      py: 3,
      height: 'unset'
    }
  },
  variants: {
    primary: {
      bg: 'blue.slitedark',
      color: 'white.0',
      _hover: {
        opacity: 0.8
      },
      _active: {
        bg: 'blue.slitedark'
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'primary'
  }
};

export default Button;
