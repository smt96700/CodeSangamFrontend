// // ChakraWrapper.js
// import React from 'react';
// import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
// import {extendTheme} from "@chakra-ui/react"
// import { useTheme } from '@mui/material/styles';

// const ChakraWrapper = ({ children }) => {
//   const globalTheme = useTheme();
//     const isDarkMode = globalTheme.palette.mode === 'dark';

//     const theme = extendTheme({
//         config : {
//             initialColorMode : isDarkMode? 'dark' : 'light',
//             useSystemColorMode : true
//         },
//     });

//   return <ChakraProvider theme = {theme}>
//     <ColorModeScript initialColorMode = {theme.config.initialColorMode}/>
//     {children}
//   </ChakraProvider>;
// };

// export default ChakraWrapper;

// import React, { useState, useEffect } from 'react';
// import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
// import { extendTheme } from '@chakra-ui/react';
// import { useTheme } from '@mui/material/styles';


// const ChakraWrapper = ({ children }) => {
//   // State to manage the color mode
//   const [colorMode, setColorMode] = useState('light');
//   const globalTheme = useTheme();
//   // Use useEffect to update colorMode when the Material-UI theme changes
//   useEffect(() => {
//     const isDarkMode = globalTheme.palette.mode === 'dark';
//     setColorMode(isDarkMode ? 'dark' : 'light');
//   }, []);

//   // Create the Chakra UI theme
//   const theme = extendTheme({
//     config: {
//       initialColorMode: colorMode,
//       useSystemColorMode: false,
//     },
//     // Additional theme customization goes here
//   });

//   return (
//     <ChakraProvider theme={theme}>
//       <ColorModeScript initialColorMode={colorMode} />
//       {children}
//     </ChakraProvider>
//   );
// };

// export default ChakraWrapper;

// ChakraWrapper.js
import React, { useState, useEffect } from 'react';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { createTheme } from '@mui/material/styles';


const ChakraWrapper = ({ children }) => {
  // Material-UI themes
const lightMuiTheme = createTheme({
  palette: {
    mode: 'light',
    // other light mode theme configurations
  },
});

const darkMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    // other dark mode theme configurations
  },
});

const lightChakraTheme = extendTheme({
    config : {
      initialColorMode : 'light'
    }
  });

  const darkChakraTheme = extendTheme({
    config : {
      initialColorMode : 'dark'
    }
  });
  // State to manage the Chakra UI theme
  const [chakraTheme, setChakraTheme] = useState(lightChakraTheme);


  useEffect(() => {
    // Access the current mode from Material-UI theme
    const isDarkMode = lightMuiTheme.palette.mode === 'dark';

    // Set the Chakra UI theme based on the Material-UI theme
    setChakraTheme(isDarkMode ? darkChakraTheme : lightChakraTheme);
  }, []);


  return (
    <ChakraProvider theme={chakraTheme}>
      <ColorModeScript initialColorMode={lightMuiTheme.palette.mode} />
      {children}
    </ChakraProvider>
  );
};

export default ChakraWrapper;


