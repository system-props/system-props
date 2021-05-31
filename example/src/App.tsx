import React from 'react';
import { Box as ScBox } from './box-styled-components';
import { Box as ScTransientBox } from './box-styled-components-transient-props';
import { Box as EmBox } from './box-emotion';

const App = () => {
  return (
    <ScBox
      display="flex"
      justifyContent="center"
      flexDirection="column"
      gap="$5"
    >
      <ScBox p="$6" bg="lightpink">
        <ScBox>Styled Components</ScBox>
        <ScBox
          color="white"
          fontFamily="$base"
          backgroundColor="$blue400"
          borderRadius="$pill"
          fontSize="$body"
          fontWeight={600}
          p="$2 $3"
          textDecoration="none"
          transition="all 200ms ease"
          margin="0 $2"
          _hover={{
            boxShadow: '0 5px 15px rgba(0, 0, 0, .12)',
            transform: 'translateY(-2px)',
          }}
        >
          Documentation
        </ScBox>
      </ScBox>

      <EmBox p="$6" bg="lightcyan">
        <EmBox>Emotion</EmBox>
        <EmBox
          sx={{ bg: '$blue400' }}
          color="white"
          fontFamily="$base"
          backgroundColor="$blue400"
          borderRadius="$pill"
          fontSize="$body"
          fontWeight={600}
          p="$2 $3"
          textDecoration="none"
          transition="all 200ms ease"
          margin="0 $2"
          _hover={{
            boxShadow: '0 5px 15px rgba(0, 0, 0, .12)',
            transform: 'translateY(-2px)',
          }}
        >
          Documentation
        </EmBox>
      </EmBox>

      <ScTransientBox $p="$6" $bg="lightseagreen">
        <ScTransientBox>Styled Components - Transient Props</ScTransientBox>
        <ScTransientBox
          $color="white"
          $fontFamily="$base"
          $backgroundColor="$blue400"
          $borderRadius="$pill"
          $fontSize="$body"
          $fontWeight={600}
          $p="$2 $3"
          $textDecoration="none"
          $transition="all 200ms ease"
          $margin="0 $2"
        >
          Documentation
        </ScTransientBox>
      </ScTransientBox>
    </ScBox>
  );
};

export default App;
