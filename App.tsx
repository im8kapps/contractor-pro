import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation";
import { DataProvider } from "./src/services/DataContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <DataProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </DataProvider>
    </SafeAreaProvider>
  );
}
