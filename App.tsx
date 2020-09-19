import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";

const AppContext = React.createContext<{}>({});

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContext.Provider>
        <Navigation />
        <StatusBar translucent />
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
