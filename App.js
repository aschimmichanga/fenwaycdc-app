import React from 'react';
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"

export default function App() {
  return (
    <GluestackUIProvider>
      <Box width="100%" height="100%" justifyContent="center" alignItems="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </GluestackUIProvider>
  );
}