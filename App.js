import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import { useColorScheme } from "react-native";
import { AuthorizationProvider } from "./context/AuthorizationContext";
import AuthNavigator from "./navigation/AuthNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <AuthorizationProvider>
            <AuthNavigator/>
          </AuthorizationProvider>
        </PaperProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
