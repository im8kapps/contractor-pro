import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DataProvider } from "../src/services/DataContext";
import { colors } from "../src/theme/colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DataProvider>
        <StatusBar style="dark" />
        <NativeTabs
          backgroundColor={colors.primaryDark}
          iconColor={{
            default: colors.mediumGrey,
            selected: colors.accent,
          }}
          labelStyle={{
            default: {
              color: colors.mediumGrey,
            },
            selected: {
              color: colors.accent,
            },
          }}
        >
          <NativeTabs.Trigger name="index">
            <Icon sf="house.fill" />
            <Label>Dashboard</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="estimates">
            <Icon sf="doc.text" />
            <Label>Estimates</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="photos">
            <Icon sf="camera" />
            <Label>Photos</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="clients">
            <Icon sf="person.2" />
            <Label>Clients</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      </DataProvider>
    </SafeAreaProvider>
  );
}
