import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { AppProvider } from "./src/contexts/AppContext"
import Navigation from "./src/navigation/Navigation"
import { theme } from "./src/theme/theme"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AppProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
              <Navigation />
            </NavigationContainer>
          </AppProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
