// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'light' ? '#202123' : '#E9E9EA',
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      },
    }),
  },
});

export default theme;
