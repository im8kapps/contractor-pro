import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Host, Button, VStack, HStack, Text, Switch, CircularProgress, LinearProgress } from '@expo/ui/swift-ui';

/**
 * Example component demonstrating Expo UI SwiftUI components
 * 
 * Note: Expo UI requires development builds - it won't work in Expo Go
 * Run: npx expo run:ios or npx expo run:android
 */
export default function ExpoUIExample() {
  const [switchValue, setSwitchValue] = useState(false);
  const [progress, setProgress] = useState(0.3);

  // Only render Expo UI on iOS (SwiftUI is iOS-only)
  if (Platform.OS !== 'ios') {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>
          Expo UI SwiftUI components are iOS-only. Use Jetpack Compose for Android.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Host style={styles.host}>
        <VStack spacing={24}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Expo UI Examples
          </Text>

          {/* Buttons */}
          <VStack spacing={12}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Buttons</Text>
            <Button
              variant="default"
              onPress={() => console.log('Default button pressed')}
            >
              Default Button
            </Button>
            <Button
              variant="bordered"
              onPress={() => console.log('Bordered button pressed')}
            >
              Bordered Button
            </Button>
          </VStack>

          {/* Switch/Toggle */}
          <VStack spacing={12}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Switch</Text>
            <Switch
              checked={switchValue}
              onValueChange={setSwitchValue}
              label="Enable notifications"
              variant="switch"
            />
          </VStack>

          {/* Progress Indicators */}
          <VStack spacing={12}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Progress</Text>
            <HStack spacing={16}>
              <CircularProgress progress={progress} color="blue" />
              <View style={{ flex: 1 }}>
                <LinearProgress progress={progress} color="blue" />
              </View>
            </HStack>
          </VStack>
        </VStack>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  host: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    textAlign: 'center',
    color: '#666',
  },
});

