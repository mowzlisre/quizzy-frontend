// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'light' ? '#202123' : '#E9E9EA',
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      },
      "::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none"
    }),
  },
  components: {
    Input: {
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: "transparent",
            },
          },
        },
      },
    },
    
    Textarea: {
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: "transparent",
            },
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderRadius: "50%", // Makes checkbox round
          width: "1.25rem", // Adjust size
          height: "1.25rem",
        },
      }
    }
  },
});

export default theme;
