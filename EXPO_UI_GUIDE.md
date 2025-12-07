# Expo UI Integration Guide

## Installation

Expo UI has been installed in your project:
```bash
npm install @expo/ui --legacy-peer-deps
```

## Important Notes

⚠️ **Expo UI requires development builds** - it will NOT work in Expo Go.

To test Expo UI components, you need to create a development build:
```bash
# For iOS
npx expo run:ios

# For Android
npx expo run:android
```

## Platform Support

- **iOS**: SwiftUI components via `@expo/ui/swift-ui`
- **Android**: Jetpack Compose components via `@expo/ui/jetpack-compose` (alpha)
- **Web**: Not yet supported

## Basic Usage

### SwiftUI (iOS)

All SwiftUI components must be wrapped in a `Host` component:

```tsx
import { Host, Button, VStack, Text } from '@expo/ui/swift-ui';

export default function MyComponent() {
  return (
    <Host style={{ flex: 1 }}>
      <VStack spacing={12}>
        <Text>Hello from SwiftUI!</Text>
        <Button variant="default" onPress={() => console.log('Pressed')}>
          Click Me
        </Button>
      </VStack>
    </Host>
  );
}
```

### Platform-Specific Rendering

Since SwiftUI is iOS-only, use platform checks:

```tsx
import { Platform } from 'react-native';
import { Host, Button } from '@expo/ui/swift-ui';

{Platform.OS === 'ios' ? (
  <Host>
    <Button onPress={handlePress}>Native Button</Button>
  </Host>
) : (
  <TouchableOpacity onPress={handlePress}>
    <Text>Fallback Button</Text>
  </TouchableOpacity>
)}
```

## Available Components

### SwiftUI Components (iOS)

- `Button` - Native iOS button
- `Text` - SwiftUI text
- `VStack`, `HStack` - Layout containers
- `Switch` - Toggle/checkbox
- `CircularProgress`, `LinearProgress` - Progress indicators
- `Picker` - Segmented or wheel picker
- `Slider` - Value slider
- `List` - Native list view
- `ContextMenu` - Dropdown menu
- `DateTimePicker` - Date/time picker
- `Gauge` - Circular gauge
- `ColorPicker` - Color selection
- `BottomSheet` - Modal sheet

### Jetpack Compose Components (Android - Alpha)

- `Button`
- `CircularProgress`
- `ContextMenu`
- `Chip`
- `DateTimePicker`

## Examples

See `src/components/ExpoUIExample.tsx` for a complete example component.

The Dashboard screen (`app/index.tsx`) has been updated to use Expo UI buttons on iOS.

## Resources

- [Expo UI Documentation](https://docs.expo.dev/versions/latest/sdk/ui/)
- [SwiftUI Guide](https://docs.expo.dev/guides/expo-ui-swift-ui/)
- [Jetpack Compose Guide](https://docs.expo.dev/versions/latest/sdk/ui/jetpack-compose/)

